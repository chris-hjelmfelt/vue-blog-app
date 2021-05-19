const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server stared on port ${port}`)) 