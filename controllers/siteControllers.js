var post = require('../models/post');
var async = require("async");

exports.questionPage = (req, res) => {
    const postSlug = req.params.slug;

    var query = post.findOne({
        slug: postSlug
    })
    query.exec(function (err, post) {
        if (err) return handleError(err);
        return res.render('questionPage', {
            // user: req.user,
            data: [post]

        });

    })
}


exports.updatePost = async (req, res) => {
    //find the method given id
    var newItem = req.body.listitem
    const postupdate = await post.findOneAndUpdate({
        _id: req.params.id
    }, {
        $push: {
            listitem: newItem
        }
    }).exec();
    res.redirect(`/${postupdate._id}/${postupdate.slug}`);

};

// exports.updatePost = async (req, res) => {
//     // console.log(req.body)
//     var newItem = req.body.listitem
//     // console.log(req.params);
//     //find the method given id
//     var item = post.findOneAndUpdate({
//             _id: req.params.id
//         }, req.body, {
//             $push: {
//                 listitem: newItem
//             }
//         },
//         function (error, success) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log(success);
//             }

//         });

//     res.redirect(`/${item._id}/${item.slug}`);
//     // res.redirect('/');
// };