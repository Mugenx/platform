const express = require('express');
const Router = require('./lib/router')
const app = express();

app.use(express.json());
app.get('/', (req, res) => res.send('helloworld'));

const router = new Router(app);
router.getRoutes();

module.exports = app;
