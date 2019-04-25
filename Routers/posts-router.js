const express = require('express');

const model = 'post'
const Database = require('../data/helpers/' + model + 'Db.js')

const router = express.Router()

sendError500Message = (res, message) => {
  res.status(500).json({
    message: message
  })
}
sendError404Message = (res, message) => {
  res.status(404).json({
    message: message
  })
}

router.get('/', async (req, res) => {
    try {
        const result = await Database.get()
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        sendError500Message(res, err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const result = await Database.getById(req.params.id)
        if (result) {
          res.status(200).json(result)
        } else {
          sendError404Message(res, 'post not found')        
        }
    } catch (err) {
        console.log(err)
        sendError500Message(res, err)
    }
})


router.post('/', async (req, res) => {
  try {
    const post = await Database.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    sendError500Message(res, err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Database.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The post has been nuked' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    sendError500Message(res, err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await Database.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    sendError500Message(res, err)
  }
});


module.exports = router;






