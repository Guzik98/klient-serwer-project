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
    USER_NAME,
    USER_PWD
}  = process.env;

function dbConnect () {
    console.log(`trying initialize connection do database: ${DBURL}`)

    mongoose.connect(DBURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auth: {
                user: USER_NAME,
                password: USER_PWD
            }
        }.then(() => {
        console.log(`Successfully connected to the database`)
            console.log(USER_NAME)
            console.log(USER_PWD)
    }).catch(err => {
        console.log(`Could not connect to the database: ${err}. Will try again very soon...`)
        setTimeout(dbConnect, 5000)
    }))
}

const app = express()
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())



mongoose.Promise = global.Promise

dbConnect()

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
