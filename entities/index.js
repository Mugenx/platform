const fs = require('fs');
const _ = require('lodash');

module.exports = {
	getEntities() {
		const getEntity = entity => require(`./${entity}`);
		return fs
			.readdirSync(__dirname)
			.filter(data => data !== 'index.js')
			.map(getEntity);
	},
	getValidation(entity) {
		const entDef = require(`./${entity}`);
		return _.get(entDef, 'validation.mandatory') || {};
	}
};
