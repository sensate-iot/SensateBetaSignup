/*
 * API version 1 router
 * 
 * Author: Michel Megens
 * Email: dev@bietje.net
 */

const express = require('express');
const mongoose = require('mongoose');
const Account = require('../models/account');

const router = express.Router();
mongoose.Promise = global.Promise;


router.all('*', (req, res, next) => {
	next();
});

router.post('/sign-up', (req, res,next) => {
	console.log('Creating new accout!');
	const acc = new Account(req.body);

	res.setHeader('X-Frame-Options', 'ALLOWALL');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

	acc.save()
		.then((data) => {
			res.status(200);
			res.json({
				status: true,
				message: 'Sign up succesful!'
			});
		})
		.catch( error => {
			console.log(error.toString());
			var msg = 'Unable to sign up!';
			if(error.code === 11000) {
				msg = 'This email is already registered!';
			}
			res.status(200).json({
				status: false,
				message: msg
			});
		});
	
		return;
});

router.all('*', (req, res) => {
	res.setHeader('X-Frame-Options', 'ALLOWALL');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.status(200);
	res.json({
		status: false,
		message: 'Unable to sign up!'
	});
});

module.exports = router;
