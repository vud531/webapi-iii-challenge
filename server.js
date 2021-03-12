const express = require('express')
const postsRouter = require('./Routers/posts-router')
const usersRouter = require('./Routers/users-router')

const server = express()

const usernameChecker = (req, res, next) =>  {
    if (req.body.name) {
        if (req.body.name == req.body.name.toUpperCase()) {
            next()
        } else {
        // next(new Error('Bad Request: uusername must be uppercase'))
            res.status(400).send('Bad Request: username must be uppercase')
        }
    }

    else {
        next();
    }
}

server.use(express.json())
server.use(usernameChecker)
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);


module.exports = server;

