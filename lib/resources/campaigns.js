var Trader = module.exports;

/**
 * Gets all campaigns
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.getCampaigns = function(params, cb) {
	return this._request('campaigns', 'get', params, cb);
};

/**
 * Creates a new campaign
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.postCampaign = function(params, cb) {
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
Trader.getCampaign = function(campaignId, params, cb) {
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
Trader.patchCampaign = function(campaignId, params, cb) {
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
Trader.deleteCampaign = function(campaignId, params, cb) {
	if (!campaignId) throw new Error('Missing campaign ID');
	
	return this._request(['campaigns', campaignId], 'delete', params, cb);
};