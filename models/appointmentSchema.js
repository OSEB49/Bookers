const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let appointmentSchema = new Schema({
    person: {type: String, required: true},
    username:{type:String, required:true},
    nameService: {type: String, required: true},
    email:{type:String, required:true},
    price: {type:Number, required: true},
    address: {type:String, },
    date: {type: Date, default: Date.now(),required: true},
    paid: {type: Boolean, default: false, required: true},
    done: {type: Boolean,  default: false,required:true},
    info: {type: String}

    
    
});

module.exports = mongoose.model('appointment', appointmentSchema);