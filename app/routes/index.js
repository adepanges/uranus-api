const requestMiddleware = require('./../middleware/request');
const errorMiddleware = require('./../middleware/error');
const routeLoader = require('./load');

module.exports = app => {
    requestMiddleware(app);
    routeLoader(app);

    app.get('/', (req, res) =>
        res.app.emit('response', res, {
            messages: 'Wllcome here :D',
            LOL: 'LOL'
        })
    );

    app.get('/health', (req, res) => {
        var endpoints = [];
        app._router.stack.forEach(function(r) {
            if (r.route && r.route.path) {
                endpoints.push(r.route.path);
            }
        });

        res.app.emit('response', res, {
            endpoints
        });
    });

    errorMiddleware(app);
};
