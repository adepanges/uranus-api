const userController = require('../../controllers/v1/user');

const router = require('express').Router();

router.get('/', userController.get);
router.post('/', userController.create);
router.delete('/:userId?', userController.destroy);
router.put('/:userId?', userController.update);

module.exports = router;
