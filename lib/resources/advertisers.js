var Trader = module.exports;

/**
 * Gets all advertisers
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.getAdvertisers = function(params, cb) {
	return this._request('advertisers', 'get', params, cb);
};

/**
 * Creates new advertiser
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.postAdvertiser = function(params, cb) {
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
Trader.getAdvertiser = function(advertiserId, params, cb) {
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
Trader.patchAdvertiser = function(advertiserId, params, cb) {
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
Trader.deleteAdvertiser = function(advertiserId, params, cb) {
	if (!advertiserId) throw new Error('Missing advertiser ID');
	
	return this._request(['advertisers', advertiserId], 'delete', params, cb);
};