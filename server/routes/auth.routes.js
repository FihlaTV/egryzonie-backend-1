const express = require('express');
const router = new express.Router();
const authController = require('../controllers/auth.controller');
const authPolicy = require('../policies/auth.policy');

router.post('/create', authPolicy.create, authController.create);

module.exports = router;
