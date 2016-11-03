var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require("./models");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/livechat', function(req, res){
  res.sendFile(__dirname + '/views/livechat.html');
});

app.get('/booking', function(req, res) {
  res.render('booking',{resortpackage:false});
});

app.post('/search', function(req, res) {
  db.resortpackage.findAll({
    where: {
      resort: req.body.resortSelect
    }
  }).then(function(resortpackage) {
    console.log(resortpackage);
    res.render('booking', {
      resortpackage: resortpackage
    });
  });
});


app.post('/chooseResort', function(req, res) {
    packageId = req.body.packageId
    packagename = req.body.packagename
    packageisland = req.body.packageisland
    packageroom = req.body.packageroom
    packagetype = req.body.packagetype
    packageprice = req.body.packageprice
    res.render('completebooking', {
      packageId: packageId,
      packagename: packagename,
      packageisland: packageisland,
      packageroom: packageroom,
      packagetype: packagetype,
      packageprice: packageprice
    });
  });

  app.post('/finishbooking', function(req, res) {
    console.log(req.params);
    db.resortpackage.find({
      where: {
        id: req.body.resortpackageId
      }
    }).then(function(resortpackage) {
    resortpackage.createBooking({
      fullName: req.body.fullname,
      email: req.body.emailadd,
      contact: req.body.contactno,
      checkIn: req.body.checkin,
      checkOut: req.body.checkout,
      pax: req.body.pax,
    }).then(function(booking) {
      console.log(booking.get());
    });
  });
    res.render('bookconfirmation');
  });


app.get('/bookconfirmation', function(req, res) {
  res.render('bookconfirmation');
});


app.get('/tripplanner', function(req, res){
  res.sendFile(__dirname + '/views/tripplanner.html');
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
var viewer = 0;


io.on('connection', function(socket){
  var addedUser = false;
  viewer++;
  socket.broadcast.emit('count', viewer);
  console.log('a user connected ' + viewer);
  io.sockets.emit('count', viewer)

  socket.on('disconnect', function(){
    viewer--;
    socket.broadcast.emit('count', viewer);
    console.log('user disconnected ' + viewer);
  });
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
