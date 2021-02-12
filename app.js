var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pg = require('pg');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const socket = require('socket.io')
const server = app.listen(3001, () => console.log('Server running on port 3001'))

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3002',
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log('connected')
  socket.on('SEND_MESSAGE', (data) => {
    console.log(data)
    io.emit('RECEIVE_MESSAGE', data);
  })
})

let datas = []


app.use('/', indexRouter);
app.use('/users', usersRouter);



const pool = new pg.Pool({
  host: "localhost",
  database: "artist_chat",
  user: "enoki",
  port: 5432
})
pool.connect()

app.post('/room', function(req, res, next) {
  const sqlCreate = "INSERT INTO rooms (name, email, delete_password) VALUES ($1, $2, $3)"
  const values = [req.body.name, req.body.email, req.body.deletePassword]
  pool.query(sqlCreate, values)
  .then()
  .catch(e => console.error(e.stack))
})

app.get('/room', (req, res, next) => {
  pool.query("SELECT * FROM rooms", (err, result) => {
    datas = result.rows
  })
  res.json(datas)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
