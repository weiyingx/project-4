var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);


app.get('/', function(req, res) {
  res.render('index');
});

// app.get('/livechat', function(req, res) {
//   res.render('livechat');
// });

app.get('/livechat', function(req, res){
  res.sendFile(__dirname + '/views/livechat.html');
});

app.get('/booking', function(req, res) {
  res.render('booking');
});

app.get('/planner', function(req, res) {
  res.render('planner');
});

app.get('/tioman', function(req, res) {
  res.render('tioman');
});

app.get('/berjaya', function(req, res) {
  res.render('berjaya');
});

app.get('/paya', function(req, res) {
  res.render('paya');
});

app.get('/panuba', function(req, res) {
  res.render('panuba');
});


app.get('/pulaubesar', function(req, res) {
  res.render('pulaubesar');
});


app.get('/aseania', function(req, res) {
  res.render('aseania');
});


app.get('/dcoconut', function(req, res) {
  res.render('dcoconut');
});


var numUsers = 0;

io.on('connection', function(socket){
  var addedUser = false;
  console.log('a user connected');
  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('add user', function (username) {
    if (addedUser) return;
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});



http.listen(port, function(){
  console.log('listening on *:3000');
});
