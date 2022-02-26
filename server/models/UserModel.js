const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:[ isEmail ],
        trim: true
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 1024,
    },
    selectedFile:{
        type: String,
    },
    bio:{
        type: String,
        maxlength: 2048,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;