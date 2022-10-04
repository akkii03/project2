const mongoose = require("mongoose");

const roomschema = new mongoose.Schema({
    name:{
        type:String,
    },
    maxcount:{
        type:Number
    },
    phone:{
        type:String
    },
    rent:{
        type:Number
    },
    images:[],

    currentbooking:[],

    roomtype:{
        type:String
    },

    description:{
        type:String
    },

    timestamps:{
        type:Date,
        default:Date.now()}

});

const roomModel = mongoose.model("rooms",roomschema);

module.exports = roomModel;