const jokeController = require('../../controllers/api/v1/joke');
const wrap = require('../../helpers/wrap_async');

const router = require('express').Router();

router.get('/random', wrap(jokeController.randomJoke));

module.exports = router;
