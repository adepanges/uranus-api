const flatten = require('flat');

var routes = {
    v1: {
        joke: './v1/joke',
        user: './v1/user'
    }
};

module.exports = app => {
    routes = flatten(routes, { delimiter: '/' });
    const list_router = Object.keys(routes);
    list_router.forEach(endpoint => {
        console.log(`[ROUTE] /${endpoint} [TO] ${routes[endpoint]}.route`);
        app.use(`/${endpoint}`, require(routes[endpoint]));
    });
};