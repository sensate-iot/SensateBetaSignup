/*
 * Pre-release sign up.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const AccountSchema = new Schema({
	firstname: {
		type: String,
		required: true,
		minlength: [1, 'first name is between 1 and 40 characters'],
		maxlength: [40, 'first name is between 1 and 40 characters']
	},
	lastname: {
		type: String,
		required: true,
		minlength: [1, 'last name must be atleast 1 character'],
		maxlength: [40, 'last name is at most 40 characters']
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email',
			isAsync: false
		}
	}
},
{
	timestamps: true,

	toJSON: {
		transform: (doc, ret) => {
			delete ret._id;
			delete ret.__v;
		}
	}
});

const Account = mongoose.model('account', AccountSchema);
module.exports = Account;
