const { model } = require('mongoose');
const contractSchema = require('../schemas/contract.schema');

const Contract = model('Contract', contractSchema);

module.exports = Contract;
