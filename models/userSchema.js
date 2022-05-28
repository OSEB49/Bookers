const { type } = require('express/lib/response');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usersSchema = new Schema({
    name: {type: String, required: true},
    email:{type:String, required:true},
    password: {type:String, required:true},
    phone: {type:Number, required:true},
    created: {type: Date, default: Date.now },
    role: {type: String, default: 'USER'}
});

module.exports = mongoose.model('users', usersSchema);