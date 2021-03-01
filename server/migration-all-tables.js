'use strict';

var path = require('path');

var app = require(path.resolve(__dirname, './server'));
var ds = app.datasources.mysqlDatasource;
var loopback = require('loopback');

ds.once('connected', function() {
  ds.autoupdate()
    .then(function(err) {
      if (err)
        console.log("Some error occurred :'(");
      else {
        console.log('done...'); process.exit(0);
      }
    });
});