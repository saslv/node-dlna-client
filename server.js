var Browser = require('nodecast-js');
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/static/')).listen(8080);

var express = require('express');
var app = express();

app.get('/api/devices', function(req, res){
	var tmp = [];

	for(var k in deviceList){
		var device = deviceList[k];
		tmp.push({
			host: device.host,
			name: device.name,
			type: device.type
		});
	}

	res.jsonp({
		devices: tmp,
		status: 'OK'
	});
});

app.get('/api/playmedia', function(req, res){
	var obj = {
		status: 'OK'
	};

	if(typeof deviceList[req.query.device] == 'undefined'){
		obj = {
			status: 'FAIL',
			message: 'No device!'
		}
	}else{
		deviceList[req.query.device].play(req.query.mediaURL, 0);
	}

	res.jsonp(obj);
});

app.get('/api/stopmedia', function(req, res){
	var obj = {
		status: 'OK'
	};

	if(typeof deviceList[req.query.device] == 'undefined'){
		obj = {
			status: 'FAIL',
			message: 'No device!'
		}
	}else{
		deviceList[req.query.device].stop();
	}

	res.jsonp(obj);
});

app.listen(8081);

var deviceList = {};

var browser = new Browser();
browser.onDevice(function (device) {
    device.onError(function(err){
        console.log(err);
    });

    console.log('new device discovered: ' + device.name + ' (' + device.type + ')');

    deviceList[device.host] = device;
});
browser.start();

var cLine = '-----------------------------------------------------------';
console.log(cLine);
console.log('Server started');
console.log(cLine);
console.log('Open this url in browser:');
console.log('http://localhost:8080/');
console.log(cLine);
