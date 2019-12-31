const express = require('express');
const Router = require('./lib/router')
const app = express();

app.use(express.json());
app.get('/', (req, res) => res.send('helloworld'));

const router = new Router(app);
router.getRoutes();

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on http://localhost:${port}`));
