var Trader = module.exports;

/**
 * Gets all creatives
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.getCreatives = function(params, cb) {
	return this._request('creatives', 'get', params, cb);
};

/**
 * Creates a new creative
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.postCreative = function(params, cb) {
	if (!params) throw new Error('No data to send');
	
	// Reference
	var self = this;
	
	// Validate if we have image size
	if (!params.format_id && params.filePath) {
		params.format_id = self.getCreativeSizeId(params.filePath)
	}
	
	// Validate if an image was actually uploaded
	if (!params.image_file_upload_id && params.filePath) {
		// Proceed to upload
		return self.postUploads({ filePath:params.filePath }, function(err, upload) {
			if (err) return cb(err);
			
			params.image_file_upload_id = upload.id;
			
			// Delete unwanted data
			delete params.filePath;
			
			return self._request('creatives', 'post', params, cb);
		});
	}
	
	// Delete unwanted data
	delete params.filePath;
	
	// Everything is there, pass request as is
	return self._request('creatives', 'post', params, cb);
};

/**
 * Gets a creative based on ID
 * @param creativeId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.getCreative = function(creativeId, params, cb) {
	if (!creativeId) throw new Error('Missing creative ID');
	
	return this._request(['creatives', creativeId], 'get', params, cb);
};

/**
 * Updates a creative based on ID
 * @param creativeId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.patchCreative = function(creativeId, params, cb) {
	if (!creativeId) throw new Error('Missing creative ID');	
	if (!params) throw new Error('No data to send');
	
	return this._request(['creatives', creativeId], 'patch', params, cb);
};

/**
 * Deletes a creative based on ID
 * @param creativeId
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.deleteCreative = function(creativeId, params, cb) {
	if (!creativeId) throw new Error('Missing creative ID');
	
	return this._request(['creatives', creativeId], 'delete', params, cb);
};