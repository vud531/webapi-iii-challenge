const express = require('express')
const postsRouter = require('./Routers/router')

const server = express()

const usernameChecker = (req, res, next) =>  {
    if (req.body.name == req.body.name.toUpperCase()) {
        next()
    } else {
        // next(new Error('Bad Request: uusername must be uppercase'))
        res.status(400).send('Bad Request: username must be uppercase')
    }
}

server.use(express.json())
server.use(usernameChecker)


module.exports = server;

