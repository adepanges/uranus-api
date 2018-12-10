const moduleController = require('../../controllers/v1/module');

const router = require('express').Router();

router.get('/', moduleController.get);
router.post('/', moduleController.create);
router.delete('/:moduleId?', moduleController.destroy);
router.put('/:moduleId?', moduleController.update);

module.exports = router;
