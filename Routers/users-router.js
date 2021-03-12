const express = require('express');

const model = 'user'
const Database = require('../data/helpers/' + model + 'Db.js')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const result = await Database.get()
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving data'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const result = await Database.getById(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving data'
        })
    }
})


router.get('/:id/posts', async (req, res) => {
  try {
    const result = await Database.getUserPosts(req.params.id)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({
        message: 'Error retrieving data'
    })
  }
})


router.post('/', async (req, res) => {
  try {
    const result = await Database.insert(req.body);
    res.status(201).json(result);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the user',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await Database.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The user has been nuked' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the user',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await Database.update(req.params.id, req.body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the user',
    });
  }
});


module.exports = router;






