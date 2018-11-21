var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = Schema.ObjectId;
mongoose.Promise = global.Promise;
const moment = require('moment'),
    slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

var voteSchema = new mongoose.Schema({
    listitem: {
        type: String,
        ref: 'post'
    },
    votedBy: {
        type: String,
        ref: 'User'
    },
    votesCount: Number,
    votes: [{
        user_id: mongoose.Schema.Types.ObjectId,
        type: Number
    }],
});

var vote = mongoose.model('vote', voteSchema);
module.exports = vote;