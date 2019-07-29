/*************************************************************************
 *
 * BANDA CONFIDENTIAL
 * __________________
 *
 *  Copyright (C) 2019
 *  Banda Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Banda Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Banda Incorporated
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Banda Incorporated.
 *
*************************************************************************/

// This is our offical v1.1 server file, not realted to the server.js file on our live D.O. instance

// `express` is used to serve up webpages
// `redis` is used to store user sessions
// `mongodb` is used to store more heavy-duty objects

//todo: change back to port 1600 for production
const EXPRESS_APP_PORT = 1900,
      PUBLIC_DIR = 'public',
      STATIC_DIR = 'static',
      REDIS_HOST = 'localhost'
      REDIS_PORT = 6379;

const express = require('express'),
      redis = require("redis"),
      session = require('express-session'),
      redisStore = require('connect-redis')(session),
      bodyParser = require('body-parser'),
			cookieParser = require('cookie-parser');

var request = require('request')


//express plugins
var client = redis.createClient();
var app = express();

//for real time capabilities:
var http = require('http').Server(app);
var io = require('socket.io')(http);
 path = require('path'),
 nodeMailer = require('nodemailer');

app.set('views', PUBLIC_DIR);
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// this is how sessions are handled
app.use(session({
	secret: 'secret password here ;p',
	store: new redisStore({ // store sessions with redis
		host: REDIS_HOST,
		port: REDIS_PORT,
		client: client,
		ttl: 100000
	}),
	saveUninitialized: false,
	resave: false,
	// cookie: { secure: true, maxAge: 86400000 }
}));

console.info("figure out why cookies aren't working");

//add dependencies to express app
app.use(cookieParser("lol my secret $c5%ookie parser 0nu@mber thingy 12038!@"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(require('morgan')('combined'));


/** ROUTES **/

// Make statics readable
app.use(express.static(STATIC_DIR));


// create the router
var router = express.Router();

// display index
router.get('/', (_, res) => res.redirect('/index'));
router.get('/index', (_, res) => { res.render('index.html'); });

//import routes from routes folder
require('./routes/navigation.js')(router, app) //for navigating through the site



//uses our router:
app.use('/', router);

// startup the server
var server = http.listen(EXPRESS_APP_PORT, ()=>{
  console.log('http+express server running on port: ' + server.address().port);
});

var email_port = 3010;
app.listen(email_port, function(req, res){
  console.log('Email is running on port: ',email_port);
});
