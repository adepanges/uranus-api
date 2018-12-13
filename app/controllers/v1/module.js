const moduleRepository = require('../../repositories/v1/module');
const Op = moduleRepository.DB.Sequelize.Op;

const get = (req, res) => {
    var params = moduleRepository.generateRequestParams(req);

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

const getChannel = (req, res) => {
    var params = {
        attributes: ['id', 'module_id', 'name', 'domain', 'desc'],
        pagination: moduleRepository.generatePaginationParams(req)
    };

    if (req.query.module_id) {
        params.where = {
            module_id: req.query.module_id
        };
    }

    moduleRepository.moduleChannelRepository.getAllWithPaging(params, res);
};

const createChannel = (req, res) => {
    var input = {
        module_id: req.body.module_id,
        name: req.body.name,
        domain: req.body.domain,
        desc: req.body.desc
    };

    moduleRepository.moduleChannelRepository.createSingle(input, res);
};

const updateChannel = (req, res) => {
    var params = {
        where: {
            id: req.params.channelModuleId
        }
    };

    var input = {
        module_id: req.body.module_id,
        name: req.body.name,
        domain: req.body.domain,
        desc: req.body.desc
    };

    moduleRepository.moduleChannelRepository.updateSingle(params, input, res);
};

const destroyChannel = (req, res) => {
    var params = {
        where: {
            id: req.params.channelModuleId
        }
    };

    moduleRepository.moduleChannelRepository.deleteSingle(params, res);
};

module.exports = {
    get,
    create,
    destroy,
    update,
    getChannel,
    createChannel,
    updateChannel,
    destroyChannel
};
