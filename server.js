require('dotenv').load();
const express = require('express');
const app = express();

global.ENV = process.env;
global.BASE_PATH = __dirname;
global.APP_PATH = `${__dirname}/app`;

const PORT = process.env.PORT || 3000;

const initApp = require('./init');
initApp(app);

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
