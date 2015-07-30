// Dependencies
var request = require('request-json');

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
	
	var resource = (typeof methodName === 'array') ? resource.join('/') : resource;
	
	return this.client[methodType](methodName, params, function(err, res, body) {
		if (err) throw new Error(methodName + ' error');
		
		callback(body);
	});
};

/*****************************************************************************/
/******************************** Advertisers ********************************/
/*****************************************************************************/

/**
 * Gets all advertisers
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.getAdvertisers = function(params, cb) {
	return this._request('advertisers', 'get', params, cb);
};

/**
 * Creates new advertiser
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.postAdvertiser = function(params, cb) {
	if (!params) throw new Error('No data to send');
	
	return this._request('advertisers', 'post', params, cb);
};

/**
 * Gets an advertiser based on ID
 * @param advertiserId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.getAdvertiser = function(advertiserId, params, cb) {
	if (!advertiserId) throw new Error('Missing advertiser ID');
	
	return this._request(['advertisers', advertiserId], 'get', params, cb);
};

/**
 * Updates an advertiser based on ID
 * @param advertiserId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.patchAdvertiser = function(advertiserId, params, cb) {
	if (!advertiserId) throw new Error('Missing advertiser ID');
	if (!params) throw new Error('No data to send');
	
	return this._request(['advertisers', advertiserId], 'patch', params, cb);
};

/**
 * Deletes an advertiser based on ID
 * @param advertiserId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.deleteAdvertiser = function(advertiserId, params, cb) {
	if (!advertiserId) throw new Error('Missing advertiser ID');
	
	return this._request(['advertisers', advertiserId], 'delete', params, cb);
};

/*****************************************************************************/
/********************************* Campaigns *********************************/
/*****************************************************************************/

/**
 * Gets all campaigns
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.getCampaigns = function(params, cb) {
	return this._request('campaigns', 'get', params, cb);
};

/**
 * Creates a new campaign
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.postCampaign = function(params, cb) {
	if (!params) throw new Error('No data to send');
	
	return this._request('campaigns', 'post', params, cb);
};

/**
 * Gets a campaign based on ID
 * @param campaignId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.getCampaign = function(campaignId, params, cb) {
	if (!campaignId) throw new Error('Missing campaign ID');
	
	return this._request(['campaigns', campaignId], 'get', params, cb);
};

/**
 * Updates a campaign based on ID
 * @param campaignId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.patchCampaign = function(campaignId, params, cb) {
	if (!campaignId) throw new Error('Missing campaign ID');	
	if (!params) throw new Error('No data to send');
	
	return this._request(['campaigns', campaignId], 'patch', params, cb);
};

/**
 * Deletes a campaign based on ID
 * @param campaignId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.prototype.deleteCampaign = function(campaignId, params, cb) {
	if (!campaignId) throw new Error('Missing campaign ID');
	
	return this._request(['campaigns', campaignId], 'delete', params, cb);
};

module.exports = function(authToken, config) {
	return new Trader(authToken, config);
};