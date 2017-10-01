const express = require('express');
const router = new express.Router();
const vetsController = require('../controllers/vets.controller');
const vetsPolicy = require('../policies/vets.policy');

router.get('/', vetsController.index);
router.post('/suggest', vetsPolicy.suggest, vetsController.suggest);

module.exports = router;
