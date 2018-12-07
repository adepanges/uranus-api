'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;
sequelize = new Sequelize(
    process.env.DB_URANUS_DB,
    process.env.DB_URANUS_USER,
    process.env.DB_URANUS_PASS,
    {
        host: process.env.DB_URANUS_HOST,
        dialect: process.env.DB_URANUS_DIALECT,
        port: process.env.DB_URANUS_PORT,
        timezone: '+07:00', //for writing to database
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        }
    }
);

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log(
            'Connection to ',
            process.env.DB_URANUS_DB + '@' + process.env.DB_URANUS_HOST,
            ' has been established successfully.'
        );
        console.log('--------------------- OK, Fine ---------------------');
    })
    .catch(err => {
        console.error(
            'Connection to',
            process.env.DB_URANUS_DB + '@' + process.env.DB_URANUS_HOST,
            'Unable to connect, error info',
            err.original.sqlMessage
        );
        console.log(
            '--------------------- Please check env config again!!!! ---------------------'
        );
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
