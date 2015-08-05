var Trader = module.exports;

/**
 * Gets all geolists
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.getGeolists = function(params, cb) {
	return this._request('geolists', 'get', params, cb);
};

/**
 * Creates a new geoList
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.postGeolist = function(params, cb) {
	if (!params) throw new Error('No data to send');
	
	return this._request('geolists', 'post', params, cb);
};

/**
 * Gets a geoList based on ID
 * @param geoListId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.getGeolist = function(geoListId, params, cb) {
	if (!geoListId) throw new Error('Missing geoList ID');
	
	return this._request(['geolists', geoListId], 'get', params, cb);
};

/**
 * Updates a geoList based on ID
 * @param geoListId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.patchGeolist = function(geoListId, params, cb) {
	if (!geoListId) throw new Error('Missing geoList ID');	
	if (!params) throw new Error('No data to send');
	
	return this._request(['geolists', geoListId], 'patch', params, cb);
};

/**
 * Deletes a geoList based on ID
 * @param geoListId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.deleteGeolist = function(geoListId, params, cb) {
	if (!geoListId) throw new Error('Missing geoList ID');
	
	return this._request(['geolists', geoListId], 'delete', params, cb);
};