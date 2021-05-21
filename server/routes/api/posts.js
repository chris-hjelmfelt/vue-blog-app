const express = require('express'),
path = require('path'),
{Client} = require('pg'),
router = express.Router();



// Get Posts
router.get('/', async (req, res) => {  // slash references where we are now not root of the project
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'vue_blog',
    password: 'abc123',
    port: 5432
  });
  client.connect()
  client.query('SELECT * from blogposts', function(err, result){
    if(err){
        console.log(err);
    } else{
      const mypost = JSON.stringify(result.rows);
      res.send(mypost);
    }        
    client.end()
  });   
});   


// Add Post
router.post('/', async (req, res) => {  // slash references where we are now not root of the project
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'vue_blog',
    password: 'abc123',
    port: 5432
  });
  client.connect()
  client.query("INSERT INTO blogposts VALUES(uuid_generate_v4(), $1, 'Chris H', 'xxxxxxxxxxx', NOW(), '{\"tags\":\"coding\"}')", 
  [req.body.title], function(err, result){
      if(err){
          console.log(err);
      } else { 
          res.redirect('/api/posts');
      }
      client.end()
  });
});  


// Delete Post
router.delete('/:post_id', async (req, res) => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'vue_blog',
    password: 'abc123',
    port: 5432
  });
  client.connect()
  client.query("DELETE FROM blogposts WHERE post_id = $1", [req.params.post_id], function(err, result){
      if(err){
          console.log(err);
      } else {
          res.sendStatus(200);
      }            
      client.end()
  });        
});


module.exports = router;


