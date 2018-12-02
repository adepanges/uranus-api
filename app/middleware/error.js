module.exports = app => {
    app.use((err, req, res, next) => {
        const { start, httpStatus, message, previousError, stack } = err;
        res.app.emit('response', res, {
            code: httpStatus || 503,
            messages: message
        });
    });
};
