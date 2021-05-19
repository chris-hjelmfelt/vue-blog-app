const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


// Get Posts
router.get('/', async (req, res) => {  // slash references where we are now not root of the project
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});   

// Add Post
router.post('/', async (req, res) => {  // slash references where we are now not root of the project
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});  

// testing with no front end - put the following into Powershell and change the text to get a new post
// curl --% --request POST --header "Content-Type: application/json" --data  "{\"text\":\"I like Vue\"}" localhost:3000/api/posts


// Delete Post


// connect to the mongodb database
async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://chris:zxc123EE@blog1.lv7is.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
    {useNewUrlParser: true}
  )

  return client.db('Blog1').collection('posts')
}

module.exports = router;


