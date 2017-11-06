const express = require('express');
const router = new express.Router();
const authController = require('../controllers/auth.controller');
const authPolicy = require('../policies/auth.policy');
const userGuard = require('../guards/user.guard');

module.exports = (payload) => {
  router.post('/create', authPolicy.create, authController.create);
  router.post('/login', authController.login);
  router.get('/user', payload.auth.authenticate(), authController.user);

  return router;
};
