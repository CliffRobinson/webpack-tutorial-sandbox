const config = require('../../knexfile').development
var devDb = require('knex')(config)

module.exports = {
    getAllUsers: function(testDb) {
        const db = testDb || devDb
        return db('users').select()
    }
}