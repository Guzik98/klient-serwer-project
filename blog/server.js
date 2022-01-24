const express = require('express');
const postsRouter = require('./routes/posts');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./models/post')
const cors = require('cors')

require('dotenv').config();
const method0verride = require('method-override')

function dbConnect () {
    console.log(`trying initialize connection do database: ${dbConfig.url}`)

    mongoose.connect(dbConfig.url).then(() => {
        console.log(`Successfully connected to the database`)
    }).catch(err => {
        console.log(`Could not connect to the database: ${err}. Will try again very soon...`)
        setTimeout(dbConnect, 5000)
    })
}

const app = express()
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const dbConfig = {}
dbConfig.url = process.env.DBURL || 'mongodb://localhost:27017/blog'

mongoose.Promise = global.Promise

dbConnect()

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(method0verride('_method'));


console.log('url',process.env.DBURL);
app.use('/posts', postsRouter);

app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('posts/index', { posts: posts });
});


app.listen(5000, function () {
    console.log("app listening on port 5000!");
});
