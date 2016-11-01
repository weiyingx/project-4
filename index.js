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

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(port, function(){
  console.log('listening on *:3000');
});
