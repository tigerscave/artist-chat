const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const roomRouter = require('./routes/room')

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
  let username = ''

  socket.on('SEND_MESSAGE', (data) => {
    console.log(data)
    io.to(data.roomID).emit('RECEIVE_MESSAGE', data);
  })

  socket.on('JOIN', (data) => {
    username = data.username;
    socket.join(data.roomID)
    io.to(data.roomID).emit('RECEIVE_MESSAGE', data);
  })

  socket.on('disconnect', () => {
    console.log(username)
    if (username) {
      io.to(data.roomID).emit(
        'RECEIVE_MESSAGE', {
          username,
          room,
          roomID,
          text: "- " + username + "leave -"
        }
      )
    }
  })
})

app.use('/', indexRouter);
app.get('/room', roomRouter);
app.post('/room', roomRouter);
app.delete('/room', roomRouter);

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
