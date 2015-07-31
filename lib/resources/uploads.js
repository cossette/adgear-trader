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
	
	params = {
		formData:{
			asset:fs.createReadStream(__dirname + '/banner.png')
		}
	};
	
	return this._request('uploads', 'post', params, cb);
};