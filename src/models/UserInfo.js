const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    userCode: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    countryCode: {
        type: String
    },
    userType: {
        type: String
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('userInfo', UserInfoSchema)