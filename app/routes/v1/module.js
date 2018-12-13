const moduleController = require('../../controllers/v1/module');

const router = require('express').Router();

router.get('/', moduleController.get);
router.post('/', moduleController.create);
router.delete('/:moduleId?', moduleController.destroy);
router.put('/:moduleId?', moduleController.update);

router.get('/channel', moduleController.getChannel);
router.post('/channel', moduleController.createChannel);
router.put('/channel/:channelModuleId?', moduleController.updateChannel);
router.delete('/channel/:channelModuleId?', moduleController.destroyChannel);

module.exports = router;
