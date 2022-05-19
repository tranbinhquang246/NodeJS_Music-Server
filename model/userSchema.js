var mongoose=require('mongoose');
var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    favorite: [{
        name: {
            type: String,
            require: true
        },
        year: {
            type: Number,
            require: true
        }
    }]
});
module.exports = mongoose.model(
    'user', UserSchema, 'User');