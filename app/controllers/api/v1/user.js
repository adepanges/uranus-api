const DB = require('./../../../models/sequelize');
const User = DB['User'];
const Op = DB.Sequelize.Op;

const all = async (req, res, next) => {
    User.findAll()
        .then(users => {
            res.app.emit('response', res, {
                users
            });
        })
        .catch(error => {
            res.app.emit('response', res, {
                code: 502,
                messages: error.errors || error.original
            });
        });
};

const create = async (req, res, next) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bio: req.body.bio,
        birthday: req.body.birthday
    })
        .then(user => {
            res.app.emit('response', res, {
                user
            });
        })
        .catch(error => {
            res.app.emit('response', res, {
                code: 502,
                messages: error.errors || error.original
            });
        });
};

const retrieve = async (req, res, next) => {
    User.findById(req.params.userId)
        .then(users => {
            res.app.emit('response', res, {
                users
            });
        })
        .catch(error => {
            res.app.emit('response', res, {
                code: 502,
                messages: error.errors
            });
        });
};

const update = async (req, res, next) => {
    User.findOne({
        where: {
            [Op.or]: [
                {
                    id: req.params.userId
                },
                {
                    uuid: req.params.userId
                }
            ]
        }
    })
        .then(user => {
            if (user == null)
                res.app.emit('response', res, {
                    code: 401,
                    messages: 'User Not Found'
                });

            user.update({
                password: req.body.password || user.password,
                email: req.body.email || user.email,
                firstname: req.body.firstname || user.firstname,
                lastname: req.body.lastname || user.lastname,
                bio: req.body.bio || user.bio,
                birthday: req.body.birthday || user.birthday
            })
                .then(() => {
                    res.app.emit('response', res, {
                        user
                    });
                })
                .catch(error => {
                    res.app.emit('response', res, {
                        code: 502,
                        messages: error.errors
                    });
                });
        })
        .catch(error => {
            res.app.emit('response', res, {
                code: 502,
                messages: error.errors
            });
        });
};

module.exports = {
    all,
    create,
    retrieve,
    update
};
