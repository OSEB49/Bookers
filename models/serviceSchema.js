const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let serviceSchema = new Schema({
    person: {type: String, required: true},
    nameOfService: {type: String, required: true},
    price:{type:String, required:true},
    active: {type:Boolean, default: false}
});

module.exports = mongoose.model('services', serviceSchema);