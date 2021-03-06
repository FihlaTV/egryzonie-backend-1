const express = require('express');
const router = new express.Router();
const vetsController = require('../controllers/vets.controller');
const vetsPolicy = require('../policies/vets.policy');
const auth = require('../auth');

module.exports = (payload) => {
  router.get('/', vetsController.index);
  router.get('/view/:vetId', vetsController.view);
  router.post('/suggest', vetsPolicy.suggest, vetsController.suggest);
  router.put('/accept_suggestion/:vetId', vetsPolicy.acceptSuggestion, vetsController.acceptSuggestion);
  router.get('/search_within_range/:range/:lat/:lng', vetsController.searchWithinRange);

  return router;
};
