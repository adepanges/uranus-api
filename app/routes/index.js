const requestMiddleware = require('./../middleware/request');
const errorMiddleware = require('./../middleware/error');

module.exports = app => {
    requestMiddleware(app);

    app.use('/v1', require('./v1'));

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

    app.use('*', function(req, res) {
        res.app.emit('response', res, {
            code: 404,
            messages: 'Not found'
        });
    });

    errorMiddleware(app);
};
