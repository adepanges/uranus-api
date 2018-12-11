const flatten = require('flat');

var routes = {
    v1: {
        instance: './v1/instance',
        module: './v1/module',
        user: './v1/user'
    }
};

module.exports = app => {
    routes = flatten(routes, { delimiter: '/' });
    const list_router = Object.keys(routes);
    list_router.forEach(endpoint => {
        console.log(`[ROUTE] /${endpoint} [TO] ${routes[endpoint]}`);
        app.use(`/${endpoint}`, require(routes[endpoint]));
    });
};
