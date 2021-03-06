const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./config/router');
const { port, dbURI } = require('./config/environment');
const mongoose = require('mongoose');
const morgan = require('morgan');

mongoose.connect(dbURI);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', router);

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express is listening on port ${port}`));

module.exports = app;
