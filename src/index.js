var createError = require("http-errors");
const http = require("http");
var express = require("express");
var bodyParser = require('body-parser')
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const passport = require('passport');
const socketio = require('socket.io')
const session = require('express-session')


var app = express();
const server = http.createServer(app);

//Database
require('./database/index')

//Passport config
require('./config/passportConfig');

//Routes
var usersRouter = require("./routes/users");
var indexRouter = require('./routes/index');
var deviceRouter =require('./routes/device');

app.use(cors()) 
app.use(logger("dev"));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use(passport.initialize());
//app.use(passport.session());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const appSession = session({ 
  secret: 'yaely', 
  resave: true, 
  saveUninitialized: true 
})
app.use(appSession);

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/device",deviceRouter)(passport);

require('./ws/socket').listen(app,server,appSession);

require('./cronjobs');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(4000, function () {
  console.log('Yaely app Started and Listened on port 4000!');
});