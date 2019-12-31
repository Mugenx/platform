const entities = require('../entities');
const Utils = require('./utils');

module.exports = class Utils {
    constructor(app) {
        this.app = app;
        this.entities = entities.getEntities();
    }
    
    getRouter(ent) {
        app.get(`/api/${ent}/all`, utils.getAll);
		app.get(`/api/${ent}/:id`, utils.get);
		app.post(`/api/${ent}`, utils.add);
		app.put(`/api/${ent}/:id`, utils.update);
		app.delete(`/api/${ent}/:id`, utils.delete);
    }

    getRouters() {
        const entNames = this.entities.map(ent => ent.entityName);
        console.log(entNames);
    }
};
