
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let adminSchema = new Schema({
    name: {type: String, required: true},
    email:{type:String, required:true},
    password: {type:String, required:true},
    created: {type: Date, default: Date.now },
    role: {type: String, default: 'ADMIN'}
});

module.exports = mongoose.model('user', adminSchema);