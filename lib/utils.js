const uuid = require('uuid/v4');
const knex = require('../db');
const entities = require('../entities');
const Joi = require('joi');
const _ = require('lodash');

module.exports = class Utils {
	validate = req => {
		const validation = entities.getValidation(this.entity);
		const validator = Joi.object(validation).unknown();
		return Joi.validate(req.body, validator);
	};

	getEntity = url => url.split('/')[2];

	format = (values, action) => {
		const entires = Object.entries(values);
		const formatted = entires.map(entry => {
			const [key, value] = entry;
			return [action === 'out'?_.camelCase(key) : _.snakeCase(key), value];
		});
		return Object.fromEntries(formatted);
	};

	fetchEntObj = req =>
		new Promise((resolve, reject) => {
			const { id } = req.params;
			knex(this.entity)
				.where({ id })
				.then(resolve)
				.catch(reject);
		});

	getAll = (req, res) => {
		this.entity = this.getEntity(req.url);
		const sendErr = err => res.status(400).send(err);
		const send = values => res.send(values);
		knex.select()
			.table(this.entity)
      .then(objs => objs.map(obj => this.format(obj, 'out')))
      .then(send)
			.catch(sendErr);
	};

	get = async (req, res) => {
		this.entity = this.getEntity(req.url);
		const [entObj] = await this.fetchEntObj(req);
		res.send(this.format(entObj, 'out') || null);
	};

	add = (req, res) => {
		this.entity = this.getEntity(req.url);
		const { error, value } = this.validate(req);
		const sendErr = err => res.status(400).send(err);
		if (error) return sendErr(error);
		value.id = uuid();
		knex(this.entity)
			.insert(this.format(value))
			.catch(sendErr)
			.finally(() => res.send(value));
	};

	update = async (req, res) => {
		this.entity = this.getEntity(req.url);
		const [entObj] = await this.fetchEntObj(req);
		const sendErr = err => res.status(400).send(err);
		if (!entObj) return sendErr('Entity Object not exit');

		const send = values => res.send(values);
		const { error, value } = this.validate(req);
		if (error) return sendErr(error);
		knex(this.entity)
			.where(entObj)
			.update(this.format(value))
			.returning('*')
			.then(send)
			.catch(sendErr);
	};

	delete = async (req, res) => {
		this.entity = this.getEntity(req.url);
		const [entObj] = await this.fetchEntObj(req);
		if (!entObj) return res.status(400).send('Entity Obj not exit');
		knex(this.entity)
			.where(entObj)
			.del()
			.finally(() => res.send('Deleted'));
	};
};
