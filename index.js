'use strict';

var express = require('express');


var app = new express();
app.use('/', express.static(__dirname + '/public'));



var server = app.listen(80, function () {
	console.log('Server started on port 80');
});