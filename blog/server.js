const express = require('express');
const postsRouter = require('./routes/posts');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./models/post')
const cors = require('cors')

require('dotenv').config();
const method0verride = require('method-override')

const {
    DBURL,
}  = process.env;

const start = async () => {
    try {
        await mongoose.connect(
            DBURL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch(e) {
        console.log(e);
    }
};


const app = express()
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

mongoose.Promise = global.Promise

start().then(r => console.log("Connected to mongodb") ).catch((e) => console.log(e))


app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(method0verride('_method'));


console.log('url',DBURL);
app.use('/posts', postsRouter);

app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('posts/index', { posts: posts });
});


app.listen(5000, function () {
    console.log("app listening on port 5000!");
});
