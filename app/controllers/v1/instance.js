const instanceRepository = require('../../repositories/v1/instance');
const Op = instanceRepository.DB.Sequelize.Op;

const get = (req, res) => {
    var params = {
        attributes: ['id', 'code', 'name'],
        pagination: instanceRepository.generatePaginationParams(req)
    };

    instanceRepository.getAllWithPaging(params, res);
};

const create = (req, res) => {
    var input = {
        code: req.body.code,
        name: req.body.name
    };

    instanceRepository.createSingle(input, res);
};

const destroy = (req, res) => {
    var params = {
        where: {
            id: req.params.instanceId
        }
    };

    instanceRepository.deleteSingle(params, res);
};

const update = (req, res) => {
    var params = {
        where: {
            id: req.params.instanceId
        }
    };

    var input = {
        code: req.body.code,
        name: req.body.name
    };

    instanceRepository.updateSingle(params, input, res);
};

module.exports = {
    get,
    create,
    destroy,
    update
};
