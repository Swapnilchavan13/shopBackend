const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: String,
    usernumber: String,
    userpassword: String,
})

const Userdata= mongoose.model('Userdata', dataSchema);

module.exports = Userdata;