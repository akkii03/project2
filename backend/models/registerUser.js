const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cpassword:{
        type:String,
        require:true
    },

    isAdmin:{
        type:Boolean,
        default:false
    }

});

const UserMongo = mongoose.model("users",userSchema);

module.exports = UserMongo;