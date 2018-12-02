const express = require('express');
const app = express();
const initApp = require('./init');

require('dotenv').load();

global.ENV = process.env;
global.BASE_PATH = __dirname;
global.APP_PATH = `${__dirname}/app`;

const PORT = process.env.PORT || 3000;

initApp(app);

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
