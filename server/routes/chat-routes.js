const log = require('loglevel')

const chat = require('../db/chat')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    log.trace(`Hitting / of chat-routes`)
    chat.getChatMessages()
        .then(msgs => {
            log.trace(`messages received from / of chat routes`)
            res.json(msgs)
        })
        .catch(err => {
            log.error('Error: ' + err.message)
            res.status(404)
            res.send('Error: ' + err.message)
        })
})

module.exports = router