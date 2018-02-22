/*
 * Database connector.
 */

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

dbUrl = 'mongodb://mongo/sensate-signup';

DbConnector = function(mongo) {
	return mongoose.connect(mongo, {
	})
	.then (db => {
		console.log('Connected to MongoDB!');
	})
	.catch(error => {
		console.warn('Unable to connected to MongoDB:');
		console.warn(error.toString());
		throw error;
	});
}(dbUrl);

module.exports = DbConnector;
