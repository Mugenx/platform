const { getEntities } = require('../../entities');
const knex = require('../index');
const _ = require('lodash');

function createTable(entity) {
	return new Promise((resolve, reject) => {
		const { name, fields } = entity;
		const makeColumns = table => {
			fields.forEach(({ field, type }) => {
				const fildName = _.snakeCase(field);
				if (type === 'id') table.uuid(fildName).primary();
				if (type === 'text') table.string(fildName);
				if (type === 'json') table.json(fildName);
				if (type === 'money') table.string(fildName);
				if (type === 'yesno') table.boolean(fildName);
				if (type === 'datetime') table.timestamp(fildName);
			});
		};
		const sendMessage = console.log(`CREATED TABLE ${name.toUpperCase()}`);
		knex.schema
			.createTable(name, makeColumns)
			.then(sendMessage)
			.catch(reject)
			.finally(resolve);
	});
}

(() => {
	const entities = getEntities();
	const jobs = entities.map(createTable);
	Promise.all(jobs).then(() => process.exit(0));
})();
