const log = require('loglevel')
var devDb = require('./connection')

module.exports = {
    getChatMessages: function (testDb) {
        /*istanbul ignore next */
        const db = testDb || devDb
        log.trace("getting all chat msgs from db")
        return db('chat')
            .join('users', 'users.id', "=", 'chat.user_id')
            .select('name', 'msg', 'time', 'room_id')
    },
    getChatMessagesByRoom: function (roomId, testDb) {
        /*istanbul ignore next */
        const db = testDb || devDb
        log.info(`getting all chat msgs from db for room ${roomId}`)
        return db('chat')
            .where('room_id', roomId)
            .join('users', 'users.id', "=", 'chat.user_id')
            .select('name', 'msg', 'time')
    },
    addChatMessage: function (msg, testDb) {
        /*istanbul ignore next */
        const db = testDb || devDb
        log.trace(`Adding message ${msg.msg} to db room ${msg.room_id}`)
        return db('chat')
            .insert(msg)
    }
}