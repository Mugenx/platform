const express = require('express');
const Router = require('./lib/router')
const app = express();


app.use(express.json());

const router = new Router(app);

app.get('/', (req, res) => {
	res.send('helloworld');
});

router.getRouters();

const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on http://localhost:${port}`));
