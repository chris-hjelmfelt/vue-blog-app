const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


// Get Posts
router.get('/', (req, res) => {  // slash references where we are now not root of the project
  res.send('hello');
});   

// Add Post



// Delete Post


module.exports = router;


