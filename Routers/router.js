const express = require(express);

const model = ''
const Database = require('./')

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

// GET /api/posts/123/messages
router.get('/:id/messages', (req, res) => {
    Posts.ge(req.params.id)
    .then(messages => {
    res.status(200).json(messages);
    })
    .catch(err => {
    res.status(500).json(err);
    });
});



router.post('/', async (req, res) => {
  try {
    const post = await Database.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  }
});

router.remove('/:id', async (req, res) => {
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
    res.status(500).json({
      message: 'Error removing the post',
    });
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
    res.status(500).json({
      message: 'Error updating the post',
    });
  }
});


// add an endpoint that returns all the messages for a post
// add an endpoint for adding new message to a post

module.exports = router;

