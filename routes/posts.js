const express = require('express');
const router  = express.Router();
const Post = require('./../models/post')

router.get('/new', (req,res) => {
    res.render('posts/new');
});

router.delete('/:id', async (req, res) => {
    console.log('here');
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/');
})


router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
    })
    try {
        console.log(post);
        await post.save();
        res.redirect(`/`)
    } catch (e) {
        console.log(e);
    }
    
});


module.exports = router;