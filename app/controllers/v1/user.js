const userRepository = require('../../repositories/v1/user');
const Op = userRepository.DB.Sequelize.Op;

const get = (req, res) => {
    var params = {
        attributes: [
            'id',
            'uuid',
            'username',
            'firstname',
            'lastname',
            'email'
        ],
        pagination: userRepository.generatePaginationParams(req)
    };

    userRepository.getAllWithPaging(params, res);
};

const create = (req, res) => {
    var params = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bio: req.body.bio,
        birthdate: req.body.birthdate
    };

    userRepository.createSingle(params, res);
};

const destroy = (req, res) => {
    var params = {
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
    };

    userRepository.deleteSingle(params, res);
};

const update = (req, res) => {
    var params = {
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
    };

    var input = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bio: req.body.bio,
        birthdate: req.body.birthdate
    };

    userRepository.updateSingle(params, input, res);
};

module.exports = {
    get,
    create,
    destroy,
    update
};
