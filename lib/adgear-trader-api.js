// Dependencies
var request = require('request-json');

// Constants
var ENDPOINT_URL = 'http://trader.adgear.com/api/v2/';

function Trader(authToken, config) {
	if (!authToken) {
		throw new TypeError('required auth token');
	}	
	
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
	if (!callback) {
		throw new Error('Missing callback.');
	}
	
	// Defaults
	params = params || {};
	
	// Add auth token
	params.auth_token = this.authToken;
	
	console.log(params);
	
	return this.client[methodType](methodName, params, function(err, res, body) {
		if (err) {
			throw new Error(methodName + ' error');
		}
		
		callback(body);
	});
};

Trader.prototype.getAdvertisers = function(params, cb) {
	return this._request('advertisers', 'get', params, cb);
};

module.exports = function(authToken, config) {
	return new Trader(authToken, config);
};