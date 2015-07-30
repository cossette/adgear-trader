var Trader = module.exports;

/**
 * Gets all flights
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.getFlights = function(params, cb) {
	return this._request('flights', 'get', params, cb);
};

/**
 * Creates a new flight
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.postFlight = function(params, cb) {
	if (!params) throw new Error('No data to send');
	
	return this._request('flights', 'post', params, cb);
};

/**
 * Gets a flight based on ID
 * @param flightId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.getFlight = function(flightId, params, cb) {
	if (!flightId) throw new Error('Missing flight ID');
	
	return this._request(['flights', flightId], 'get', params, cb);
};

/**
 * Updates a flight based on ID
 * @param flightId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.patchFlight = function(flightId, params, cb) {
	if (!flightId) throw new Error('Missing flight ID');	
	if (!params) throw new Error('No data to send');
	
	return this._request(['flights', flightId], 'patch', params, cb);
};

/**
 * Deletes a flight based on ID
 * @param flightId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.deleteFlight = function(flightId, params, cb) {
	if (!flightId) throw new Error('Missing flight ID');
	
	return this._request(['flights', flightId], 'delete', params, cb);
};