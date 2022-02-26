const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    posterId: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    title:{
        type: String,
        require: true
    },
    picture: {
        type: String,
    },
    likes:{
        type: Number,
        default: 0,
        
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

const PostModel = mongoose.model('post', PostSchema);
module.exports = PostModel;