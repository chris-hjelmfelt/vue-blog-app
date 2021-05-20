const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


const port = process.env.PORT || 5000;

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server started on port ${port}`)) 