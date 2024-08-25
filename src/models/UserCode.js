const mongoose = require('mongoose');

const UserCodechema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName:{
        required:true,
        type:String
    },
    userCode:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String 
    },
    phone:{
        required:true,
        type:String
    },
    passWord:{
        required:true,
        type:String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('userCodeList', UserCodechema)