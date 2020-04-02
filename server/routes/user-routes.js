const log = require('loglevel')
const users = require('../db/users')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    log.trace(`Hitting / of user-routes`)
    users.getAllUsers()
        .then(users => {
            log.trace(`users received from / of user routes`)
            res.json(users)
        })
        .catch(err => {
            //TODO: Test this somehow?
            log.error('Error: ' + err.message)
            res.status(404)
            res.send('Error: ' + err.message)
        })
})

module.exports = router