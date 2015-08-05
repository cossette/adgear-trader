require('chai').should();

var dotenv = require('dotenv');
	dotenv.load();

var _ = require('underscore');
var inflect = require('inflect');

var trader = require('../index.js')(process.env.AUTH_TOKEN);

var resources = ['advertiser' , 'campaign', 'creative', 'flight', 'geolist'];

_.each(resources, function(resource, index, list) {
	var getAll = 'get' + inflect.capitalize(inflect.pluralize(resource));
	var getSingle = 'get' + inflect.capitalize(resource);
	var patchSingle = 'patch' + inflect.capitalize(resource);
	
	describe('#' + getAll, function() {
		it('gets all ' + inflect.pluralize(resource), function() {
			(function() {
				trader[getAll]();
			}).should.throw(Error);
			
			(function() {
				trader[getAll](null);
			}).should.throw(Error);
			
			(function() {
				trader[getAll](null, null);
			}).should.throw(Error);
			
			trader[getAll](null, function() {}).should.be.ok;
		});
		
		describe('#' + getSingle, function() {
			it('gets a ' + inflect.pluralize(resource), function() {
				(function() { trader[getSingle](); }).should.throw(Error);
				
				(function() { trader[getSingle](null); }).should.throw(Error);
				
				(function() { trader[getSingle](null, null); }).should.throw(Error);
				
				(function() { trader[getSingle](null, null, null); }).should.throw(Error);
				
				(function() { trader[getSingle](4014, null, null); }).should.throw(Error);
				
				(function() { trader[getSingle](null, null, function() {}); }).should.throw(Error);
				
				trader[getSingle](4014, {}, function() {}).should.be.ok;
				trader[getSingle](4014, null, function() {}).should.be.ok;
			});
		});
		
		describe('#' + patchSingle, function() {
			it('patches a ' + inflect.pluralize(resource), function() {
				(function() { trader[patchSingle](); }).should.throw(Error);
				
				(function() { trader[patchSingle](null); }).should.throw(Error);
				
				(function() { trader[patchSingle](null, null); }).should.throw(Error);
				
				(function() { trader[patchSingle](null, null, null); }).should.throw(Error);
				
				(function() { trader[patchSingle](4014, null, null); }).should.throw(Error);
				
				(function() { trader[patchSingle](null, null, function() {}); }).should.throw(Error);
				
				(function() { trader[patchSingle](4014, null, function() {}); }).should.throw(Error);
				
				trader[patchSingle](4014, { name:"Test " + Math.random() }, function() {  }).should.be.ok;
			});
		});
	});
});