const Joi = require('joi');

module.exports = {
	mandatory: {
		firstName: Joi.string()
			.min(2)
			.required(),
		lastName: Joi.string()
			.min(2)
			.required()
	}
};
