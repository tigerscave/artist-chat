var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const pg = require('pg');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const http = require('http').Server(app)
const io = require('socket.io')
const fs = require('fs')
// io.on('connection', function (socket) {
//   console.log('connected')
// })

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )


  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let datas = []


app.use('/', indexRouter);
app.use('/users', usersRouter);



app.use('/create', function(req, res, next) {
  const pool = new pg.Pool({
    host: "localhost",
    database: "artist_chat",
    user: "enoki",
    port: 5432
  })
  pool.connect()

  const sqlCreate = "INSERT INTO users (name, email) VALUES ($1, $2)"
  const values = [req.body.name, 'email']
  pool.query(sqlCreate, values)
    .then(res => {
        pool.end()
    })
    .catch(e => console.error(e.stack))
})



app.use('/get', (req, res, next) => {
  pool.query("SELECT name FROM users", (err, result) => {
    console.log(result.rows)
    datas = result.rows
    res.json(datas)
  }).then(res => {pool.end()})
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

app.listen(3001, () => console.log('Server running on port 3001'))

module.exports = app;
