const instanceController = require('../../controllers/v1/instance');

const router = require('express').Router();

router.get('/', instanceController.get);
router.post('/', instanceController.create);
router.delete('/:instanceId?', instanceController.destroy);
router.put('/:instanceId?', instanceController.update);

module.exports = router;
