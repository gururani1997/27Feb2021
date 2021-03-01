'use strict';
var loopback = require('loopback');
var app = module.exports = loopback();

var boot = require('loopback-boot');
var path = require('path');


/* get and set user session for globally */
var session = require('express-session');
app.use(session({
    secret: 'Social app by ots..',
    resave: true,
    saveUninitialized: true
}));

app.use(function(req, res, next) {
	app.locals.user_session = req.session.user;
	next();
});
// end session ==========================================


var flash = require('connect-flash');
app.use(flash());

app.start = function() {
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../client'));
    app.use(loopback.static(path.resolve(__dirname, '../client/assets')));
    app.use(loopback.static(path.resolve(__dirname, '..uploads')));
    
    //app.use(loopback.json());
    //app.use(loopback.urlencoded());

    // start the web server
    return app.listen(function() {
      app.emit('started');
      var baseUrl = app.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl);
      if (app.get('loopback-component-explorer')) {
        var explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});


/** global variable **/
global.baseUrl = 'http://localhost:8000/';
global.appName = "Node_Test";
global.siteName = "Node_Test";
global.globalDefaultValue = "N.A";
global.globalPerPageLimit = 10;
//global.timeStamp = new Date();



global.APP_NAME = "Node_Test";


var DATASOURCE = require('../server/datasources.json');
global.fromEmail = DATASOURCE.email.transports[0].auth.user;
global.clientEmail = DATASOURCE.email.transports[0].auth.clientEmail;


global.CONSTANT = require('../server/constant.json');


/** global variable **/
