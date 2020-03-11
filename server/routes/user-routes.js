const db = require('../db/index')

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    db.getAllUsers()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.log(`Error: ${err.message}`)
            res.status(404)
            res.send('Error: ' + err.message)
        })
})

module.exports = router