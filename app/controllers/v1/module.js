const moduleRepository = require('../../repositories/v1/module');
const Op = moduleRepository.DB.Sequelize.Op;

const get = (req, res) => {
    var params = {
        attributes: ['id', 'code', 'name', 'desc', 'status'],
        pagination: moduleRepository.generatePaginationParams(req)
    };

    moduleRepository.getAllWithPaging(params, res);
};

const create = (req, res) => {
    var input = {
        code: req.body.code,
        name: req.body.name,
        desc: req.body.desc,
        status: req.body.status || 1
    };

    moduleRepository.createSingle(input, res);
};

const destroy = (req, res) => {
    var params = {
        where: {
            id: req.params.moduleId
        }
    };

    moduleRepository.deleteSingle(params, res);
};

const update = (req, res) => {
    var params = {
        where: {
            id: req.params.moduleId
        }
    };

    var input = {
        code: req.body.code,
        name: req.body.name,
        desc: req.body.desc,
        status: req.body.status || 1
    };

    moduleRepository.updateSingle(params, input, res);
};

module.exports = {
    get,
    create,
    destroy,
    update
};
