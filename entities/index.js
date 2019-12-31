const fs = require('fs');

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
		return entDef.validation.mandatory;
	}
};
