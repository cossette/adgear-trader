require('chai').should();

var dotenv = require('dotenv');
	dotenv.load();

var _ = require('underscore');
var inflect = require('inflect');

var trader = require('../index.js')(process.env.AUTH_TOKEN);

var resources = ['advertiser', 'campaign', 'creative', 'flight'];

_.each(resources, function(resource, index, list) {
	var method = 'get' + inflect.capitalize(inflect.pluralize(resource));
	
	describe('#' + method, function() {
		it('gets all ' + inflect.pluralize(resource), function() {
			(function() {
				trader[method]();
			}).should.throw(Error);
			
			(function() {
				trader[method](null);
			}).should.throw(Error);
			
			(function() {
				trader[method](null, null);
			}).should.throw(Error);
			
			trader[method](null, function() {}).should.be.ok();
		});
	});
});