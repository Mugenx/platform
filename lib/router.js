const entities = require('../entities');
const Utils = require('./utils');

module.exports = class Router {
	constructor(app) {
		this.app = app;
	}

	getRoutes() {
		const ents = entities.getEntities();
		const utils = new Utils();

		const _setRoutes = ent => {
            const { name } = ent;
			this.app.get(`/api/${name}/all`, utils.getAll);
			this.app.get(`/api/${name}/:id`, utils.get);
			this.app.post(`/api/${name}`, utils.add);
			this.app.put(`/api/${name}/:id`, utils.update);
			this.app.delete(`/api/${name}/:id`, utils.delete);
		};
		return ents.map(_setRoutes);
	}
};
