function attachProcessMessagesSequelize(_this) {
    _this.generateSequelizeValidationMessage = (error, res, failed_cb) => {
        var errors = {};

        for (i = 0; i < error.errors.length; i++) {
            var item = error.errors[i];
            errors[item.path] = item.message;
        }

        if (typeof failed_cb == 'function') {
            failed_cb(errors);
        } else {
            res.app.emit('response', res, {
                code: 403,
                messages: 'Validation Errors',
                errors
            });
        }
    };

    _this.generateErrors = (errors, res, failed_cb) => {
        var sequelizeErrorName = [
            'SequelizeValidationError',
            'SequelizeUniqueConstraintError',
            'SequelizeEagerLoadingError'
        ];

        console.log(errors);

        if (
            sequelizeErrorName.indexOf(errors.name) >= 0 &&
            errors.errors &&
            errors.errors.length > 0
        ) {
            _this.generateSequelizeValidationMessage(errors, res, failed_cb);
        } else {
            if (typeof failed_cb == 'function') {
                failed_cb(error);
            } else {
                res.app.emit('response', res, {
                    code: 503,
                    messages:
                        errors.errors ||
                        errors.original.sqlMessage ||
                        errors.original
                });
            }
        }
    };

    _this.generateDone = (data, res, success_cb) => {
        if (typeof success_cb == 'function') {
            success_cb(data);
        } else {
            res.app.emit('response', res, {
                [String(_this.modelName).toLocaleLowerCase()]: data
            });
        }
    };

    _this.generateErrorNotFound = res => {
        res.app.emit('response', res, {
            code: 403,
            messages:
                String(_this.modelName).toLocaleLowerCase() + ' is not found'
        });
    };

    return _this;
}

function attachProcessParams(_this) {
    _this.generateRequestParams = req => {
        var generatedParams = {
            pagination: _this.generatePaginationParams(req)
        };

        var attributes = _this.generateAttributeRequest(req);
        if (attributes.length > 0) generatedParams.attributes = attributes;

        var includes = _this.generateIncludesRequest(req);
        if (includes.length > 0) generatedParams.includes = includes;

        return generatedParams;
    };

    _this.generateAttributeRequest = req => {
        var attributesFiltered = new Array();

        if (_this.availableAttributes.length > 0) {
            if (req.query.attributes) {
                var attributes = String(req.query.attributes).split(',');
                if (attributes.length > 0) {
                    attributes.forEach((item, key) => {
                        if (
                            _this.availableAttributes.indexOf(
                                String(item).trim()
                            ) > -1
                        )
                            attributesFiltered.push(String(item).trim());
                    });
                }
            } else {
                attributesFiltered = _this.availableAttributes;
            }
        }

        return attributesFiltered;
    };

    _this.generateIncludesRequest = req => {
        var includeFiltered = new Array();

        if (req.query.includes) {
            var queryIncludes = req.query.includes;

            if (!Array.isArray(queryIncludes))
                queryIncludes = String(queryIncludes).split(',');
            // .forEach((row, key) => {
            //     queryIncludes[row] = '';
            // });

            for (var key in queryIncludes) {
                console.log(key);

                var raw_attr = String(req.query.includes[key]).trim(),
                    attr = raw_attr.split(','),
                    includeModel = _this.model.includes[key];
                includeModel.attributes = new Array();
                var availableAttributes =
                    includeModel.availableAttributes || new Array();
                if (includeModel) {
                    if (raw_attr != '') {
                        attr.forEach((item, key) => {
                            if (availableAttributes.indexOf(item) > -1) {
                                includeModel.attributes.push(item);
                            }
                        });
                    } else includeModel.attributes = availableAttributes;
                    includeFiltered.push(includeModel);
                }
            }
        }

        return includeFiltered;
    };

    /*
        author: Ade Pangestu (adepanges@gmail.com)
        -------------------------------------
        method generatePaginationParams: to generate params pagination send from req.query 
        -------------------------------------
        req: is _thisect from express request
        -------------------------------------
    */
    _this.generatePaginationParams = req => {
        return {
            limit: req.query.limit,
            page: req.query.page
        };
    };

    return _this;
}

function attachRetrieve(_this) {
    var pagination_default_limit =
        Number(ENV.DATA_PAGINATION_DEFAULT_LIMIT) || 10;

    _this.getFirst = (params, success_cb, failed_cb) => {
        _this.model
            .findOne(params)
            .then(data => {
                if (typeof success_cb == 'function') {
                    success_cb(data);
                }
            })
            .catch(error => {
                if (typeof failed_cb == 'function') {
                    failed_cb(error);
                }
            });
    };

    /*
        author: Ade Pangestu (adepanges@gmail.com)
        -------------------------------------
        method getAll: to retrive data wihtout count data
        -------------------------------------
        params: is array options sequelize
        success_cb: is function to callback if success
        failed_cb: is function to callback if failed
        -------------------------------------
    */
    _this.getAll = (params, success_cb, failed_cb) => {
        _this.model
            .findAll(params)
            .then(data => {
                if (typeof success_cb == 'function') {
                    success_cb(data);
                }
            })
            .catch(error => {
                if (typeof failed_cb == 'function') {
                    failed_cb(error);
                }
            });
    };

    /*
        author: Ade Pangestu (adepanges@gmail.com)
        -------------------------------------
        method getCountAll: to retrive data wiht count data
        -------------------------------------
        params: is array options sequelize
        success_cb: is function to callback if success
        failed_cb: is function to callback if failed
        -------------------------------------
    */
    _this.getCountAll = (params, success_cb, failed_cb) => {
        _this.model
            .findAndCountAll(params)
            .then(data => {
                if (typeof success_cb == 'function') {
                    success_cb(data);
                }
            })
            .catch(error => {
                if (typeof failed_cb == 'function') {
                    failed_cb(error);
                }
            });
    };

    /*
        author: Ade Pangestu (adepanges@gmail.com)
        -------------------------------------
        method getAllWithPaging: to retrive data and response to client with pagination
        -------------------------------------
        params: is array options sequelize
        res: is _thisect from express callback response
        success_cb: is function to callback if success
        failed_cb: is function to callback if failed
        -------------------------------------
        note if success_cb, failed_cb is set will be to call priority then res callback
        -------------------------------------
    */
    _this.getAllWithPaging = (params, res, success_cb, failed_cb) => {
        params = _this.generatePaginationQuery(params);

        _this.getCountAll(
            params,
            data => {
                if (typeof success_cb == 'function') {
                    success_cb(data);
                } else {
                    var { paginationResponse } = params;

                    res.app.emit('response', res, {
                        [String(_this.modelName).toLocaleLowerCase()]: {
                            data: data.rows,
                            pagination: _this.generatePaginationResponse(
                                data,
                                paginationResponse
                            )
                        }
                    });
                }
            },
            errors => _this.generateErrors(errors, res, failed_cb)
        );
    };

    /*
        author: Ade Pangestu (adepanges@gmail.com)
        -------------------------------------
        method getAllWithoutPaging: to retrive data and response to client without pagination
        -------------------------------------
        params: is array options sequelize
        res: is _thisect from express callback response
        success_cb: is function to callback if success
        failed_cb: is function to callback if failed
        -------------------------------------
        note if success_cb, failed_cb is set will be to call priority then res callback
        -------------------------------------
    */
    _this.getAllWithoutPaging = (params, res, success_cb, failed_cb) => {
        _this.getAll(
            params,
            data => _this.generateDone(data, res, success_cb),
            error => _this.generateErrors(errors, res, failed_cb)
        );
    };

    /*
        author: Ade Pangestu (adepanges@gmail.com)
        -------------------------------------
        method generatePaginationResponse: to generate response pagination
        -------------------------------------
        data: expected 2 _thisect count and rows usualy from response findAndCountAll
        paginationResponse: parse from generatePaginationQuery
        -------------------------------------
    */
    _this.generatePaginationResponse = (data, paginationResponse) => {
        var length_rows = data.rows.length;
        data.count = data.count || -1;

        paginationResponse.to = paginationResponse.from + (length_rows - 1);
        paginationResponse.total = Number(data.count);
        paginationResponse.total_page = Math.ceil(
            paginationResponse.total / paginationResponse.limit
        );
        paginationResponse.has_more =
            paginationResponse.current_page < paginationResponse.total_page;

        if (paginationResponse.to < paginationResponse.from) {
            paginationResponse.from = 0;
            paginationResponse.to = 0;
        }

        return paginationResponse;
    };

    /*
        author: Ade Pangestu (adepanges@gmail.com)
        -------------------------------------
        method generatePaginationQuery: to proses param pagination
        -------------------------------------
        params: is options params, expected have _thisect pagination in there
        -------------------------------------
    */
    _this.generatePaginationQuery = params => {
        var paginationResponse = {
            limit: pagination_default_limit,
            from: 1,
            to: pagination_default_limit,
            total: -1,
            current_page: 1,
            total_page: -1,
            has_more: null
        };

        params.limit = pagination_default_limit;
        params.offset = 0;

        if (params.pagination) {
            var { limit, page } = params.pagination;

            limit = Number(limit) || pagination_default_limit;
            page = Number(page);
            var offset = (page - 1) * limit;

            if (isNaN(offset)) params.offset = 0;
            else if (offset >= 0) params.offset = offset;
            params.limit = limit;

            paginationResponse.limit = limit;
            paginationResponse.from = params.offset + 1;
            paginationResponse.to = paginationResponse.from + (limit - 1);
            paginationResponse.current_page = page >= 1 ? page : 1;

            delete params.pagination;
        }

        params.paginationResponse = paginationResponse;

        return params;
    };

    return _this;
}

function attachCreateUpdateDelete(_this) {
    /*
        author: Ade Pangestu (adepanges@gmail.com)
        -------------------------------------
        method create: to retrive data wihtout count data
        -------------------------------------
        params: is array options sequelize
        res: is response callback express
        success_cb: is function to callback if success
        failed_cb: is function to callback if failed
        -------------------------------------
    */
    _this.createSingle = (params, res, success_cb, failed_cb) => {
        _this.model
            .create(params)
            .then(data => _this.generateDone(data, res, success_cb))
            .catch(errors => _this.generateErrors(errors, res, failed_cb));
    };

    _this.updateSingle = (params, input, res, success_cb, failed_cb) => {
        _this.getFirst(
            params,
            data => {
                if (!data) _this.generateErrorNotFound(res);
                else
                    data.update(input)
                        .then(data => _this.generateDone(data, res, success_cb))
                        .catch(errors =>
                            _this.generateErrors(errors, res, failed_cb)
                        );
            },
            errors => _this.generateErrors(errors, res, failed_cb)
        );
    };

    _this.deleteSingle = (params, res, success_cb, failed_cb) => {
        _this.getFirst(
            params,
            data => {
                if (!data) _this.generateErrorNotFound(res);
                else
                    data.destroy()
                        .then(data => _this.generateDone(data, res, success_cb))
                        .catch(errors =>
                            _this.generateErrors(errors, res, failed_cb)
                        );
            },
            errors => _this.generateErrors(errors, res, failed_cb)
        );
    };

    return _this;
}

function baseRepository(modelInstance, modelName) {
    var _this = {
        DB: '',
        modelName: '',
        model: '',
        availableAttributes: []
    };

    switch (modelInstance) {
        case 'sequelize':
            DB = require('../models/sequelize');
            _this.modelName = modelName;
            _this.DB = DB;
            if (DB[modelName]) {
                _this.model = _this.DB[modelName];
            } else {
                conssole.log('Schema', modelName, 'is not found in sequelize');
            }
            break;
    }

    _this = attachProcessParams(_this);
    _this = attachRetrieve(_this);
    _this = attachCreateUpdateDelete(_this);
    _this = attachProcessMessagesSequelize(_this);

    return _this;
}

module.exports = baseRepository;
