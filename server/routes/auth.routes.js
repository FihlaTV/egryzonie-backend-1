const express = require('express');
const router = new express.Router();
const authController = require('../controllers/auth.controller');
const authPolicy = require('../policies/auth.policy');
const userGuard = require('../guards/user.guard');

router.post('/create', authPolicy.create, authController.create);
router.post('/login', authController.login);

router.use('/user', userGuard);
router.get('/user/checkLogin', authController.checkLogin);

module.exports = router;
