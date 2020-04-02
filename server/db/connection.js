const knex = require('knex');
const config = require('../../knexfile').development//[process.env.NODE_ENV || 'development'];

module.exports = knex(config);