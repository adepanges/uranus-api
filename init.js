const router = require('./app/routes/index');

module.exports = app => {
    /*
    mongoose.Promise = global.Promise;
    // Connecting to the database
    mongoose.connect(config.database.mongo_url, {
        useNewUrlParser: true,
    }).then(() => {
        logger.debug('Successfully connected to the database');
    }).catch(err => {
        logger.info(err);
        logger.debug('Could not connect to the mongo database. Exiting now...');
        process.exit();
    });
    */

    router(app);
};
