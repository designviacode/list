var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;
mongoose.Promise = global.Promise;
const moment = require('moment'),
    slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

var postSchema = new mongoose.Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    question: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        trim: true,
    },
    listitem: [{
        name: String,
        votesCount: {
            type: Number,
            ref: 'votes'
        },
    }],
    slug: {
        type: String,
        slug: ["question"]
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: [String]
}, {
    timestamps: {
        date: 'Submit Date'
    }
});



var post = mongoose.model('post', postSchema);
module.exports = post;