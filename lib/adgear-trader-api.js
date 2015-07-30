// Dependencies
var fs = require('fs');
var request = require('request-json');
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
		self.client = request.createClient(this.endpoint);
	
	return self;
}

/**
 * Requests JSON from the API and returns to callback
 * @param methodName
 * @param methodType
 * @param params
 * @param callback
 * @private
 */
Trader.prototype._request = function(methodName, methodType, params, callback) {
	if (!callback) throw new Error('Missing callback.');
	
	// Defaults
	params = params || {};
	
	// Add auth token
	params.qs = params.qs || {}; 
	params.qs.auth_token = this.authToken;
	
	var url = (typeof methodName === 'object') ? methodName.join('/') : methodName;
	
	return this.client[methodType](url, params, function(err, res, body) {
		if (err) throw new Error(url + ' error');
		
		callback(body);
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