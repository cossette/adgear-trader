var fs = require('fs');

var Trader = module.exports;

/**
 * Gets all creatives
 * @param params
 * @param cb
 * @returns {*}
 */
Trader.postUploads = function(params, cb) {
	if (!params) throw new Error('No data to send');
	if (!fs.existsSync(params.filePath)) throw new Error('File is missing');
	
	
	
	params = {
		formData:{
			asset:fs.createReadStream(params.filePath)
		}
	};
	
	return this._request('uploads', 'post', params, cb);
};