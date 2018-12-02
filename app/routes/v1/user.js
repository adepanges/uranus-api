const userController = require('../../controllers/v1/user');
const wrap = require('../../helpers/wrap_async');

const router = require('express').Router();

router.get('/', wrap(userController.all));
router.get('/:userId', wrap(userController.retrieve));
router.post('/', wrap(userController.create));
router.put('/:userId?', wrap(userController.update));

module.exports = router;
