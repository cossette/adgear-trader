var Trader = module.exports;

// Required modules
var fs = require('fs');
var sizeOf = require('image-size');

/**
 * 
 * @param creativePath
 * @returns {*}
 */
Trader.getCreativeSizeId = function(creativePath) {
	if (!fs.existsSync(creativePath)) throw new Error('File is missing');
	
	var imageDimensions = sizeOf(creativePath);
	
	var creativeDimensions = {
		'728x90':1,
		'300x250':2,
		'160x600':3,
		'336x280':4,
		'468x60':5,
		'120x600':6,
		'300x600':7,
		'200x200':10,
		'250x250':9,
		'970x250':11,
		'320x50':12,
		'180x150':13,
		'300x50':14,
		'234x60':15,
		'720x300':16,
		'320x480':17,
		'480x320':18,
		'725x360':21,
		'741x360':22,
		'640x960':23,
	};
	
	return creativeDimensions[imageDimensions.width + 'x' + imageDimensions.height];
};