const express = require('express');
const contract_router = express.Router();
const {
  update,
  get_all_contracts,
  get_contract,
} = require('../controllers/contract.controller');

const { verify_token } = require('../controllers/authorization.controller');

contract_router.use(verify_token);

contract_router.route('/').get(get_all_contracts);

contract_router.route('/:id').patch(update).get(get_contract);

module.exports = contract_router;
