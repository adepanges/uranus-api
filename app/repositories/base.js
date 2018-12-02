class BaseRepository {

    constructor(modelName) {
        this.DB = loadModel('sequelize');
        this.modelName = this.DBmodelName;
        this.model = this.DB[modelName];
    }

    allWithoutPaging(req, res) {
        this.model.findAll()
            .then(users => {
                res.app.emit('response', res, {
                    users
                })
            })
            .catch(error => {
                res.app.emit('response', res, {
                    code: 502,
                    messages: error.errors || error.original
                })
            });
    }
}

module.exports = BaseRepository;