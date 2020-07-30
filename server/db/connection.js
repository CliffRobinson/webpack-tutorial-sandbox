const knex = require('knex');
const environment = process.env.NODE_ENV || 'development'
console.log(`Environment is ${environment}`);
const config = require('../../knexfile')[/* process.env.NODE_ENV ||  */'development'];

module.exports = knex(config);