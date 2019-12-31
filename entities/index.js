require('dotenv').config();
const fs = require('fs');
const _ = require('lodash');
const APP_CONFIG = process.env.APP_CONFIG;

module.exports = {
	getEntities() {
		const getEntity = ent => require(`${APP_CONFIG}/entities/${ent}`);
		return fs
			.readdirSync(`${APP_CONFIG}/entities`)
			.filter(data => data !== 'index.js')
			.map(getEntity);
	},
	getValidation(ent) {
		const entDef = require(`${APP_CONFIG}/entities/${ent}`);
		return _.get(entDef, 'validation.mandatory') || {};
	}
};
