// Dependencies
var fs = require('fs');
var request = require('request');
var conflate = require('conflate');

// Constants
var ENDPOINT_URL = 'http://trader.adgear.com/api/v2/';

/**
 * Constructor for the API client
 * @param authToken
 * @param config
 * @returns {Trader}
 * @constructor
 */
function Trader(authToken, config) {
	if (!authToken) throw new TypeError('required auth token');
	
	// Defaults
	config = config || {};
	
	// Config
	var self = this;
		self.authToken = authToken;
		self.endpoint = config.endpoint || ENDPOINT_URL;
	
	return self;
}

/**
 * Requests JSON from the API and returns to callback
 * @param resource
 * @param method
 * @param params
 * @param callback
 * @private
 */
Trader.prototype._request = function(resource, method, params, callback) {
	if (!callback) throw new Error('Missing callback.');
	
	// Defaults
	params = params || {};
	
	// Resource
	resource = ((typeof resource === 'object') ? resource.join('/') : resource);
	
	var properties = {
		method:method,
		url:this.endpoint + resource,
		qs:{ auth_token:this.authToken },
		headers:{
			'Content-Type':'application/json'
		}
	};
	
	if (method === 'get') {
		conflate(properties.qs, params);
	} else {
		properties.body = JSON.stringify(params);
	}
	
	return request(properties, function(err, res, body) {
		if (err) throw new Error(properties.url + ' error' + err.message);
		
		callback(JSON.parse(body));
	});
};

// Load resources from the resources folder to extend the prototype
var files = fs.readdirSync(__dirname + '/resources/');
for (var i = 0; i < files.length; i++) {
	if (files[i].match(/.*\.js/)) {
		var res = require('./resources/' + files[i]);
		conflate(Trader.prototype, res);
	}
}

module.exports = function(authToken, config) {
	return new Trader(authToken, config);
};