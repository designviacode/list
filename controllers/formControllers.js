var post = require('../models/post');
var async = require("async");

exports.createList = (req, res) => {

    console.log(req.body);
    req.body.question;
    req.body.category;
    // req.body.username = req.user._id;
    // req.body.method = req.params.id;
    // const newReview = new Review(req.body);
    // newReview.save();
    // /*  req.flash('success', "Review saved"); */
    // res.redirect('back');

    const newPost = new post(req.body);
    newPost.save();

    res.redirect('/');

};