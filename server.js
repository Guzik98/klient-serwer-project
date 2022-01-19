const express = require('express');
const postsRouter = require('./routes/posts');
const mongoose = require('mongoose')
const Post = require('./models/post')
const app = express();
require('dotenv').config();
const method0verride = require('method-override')

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(method0verride('_method'));

mongoose.connect(process.env.URI || process.env.CONNECTION)

app.use('/posts', postsRouter);

app.get('/', async (req, res) => {
    const posts = await Post.find()
    res.render('posts/index', { posts: posts });
});


app.listen(5000);