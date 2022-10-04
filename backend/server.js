const express = require("express");
const app = express();
const mongoose = require("mongoose");
const roomModel = require("./models/rooms");
const UserMongo = require("./models/registerUser");
const bodyParser = require("body-parser");
const bookingDb = require("./models/booking");
const moment = require("moment");
app.use(bodyParser.json());
const cors = require("cors");

app.use(cors());

const dbUrl = "mongodb+srv://ayush:ayush123@cluster0.swqiskf.mongodb.net/project?retryWrites=true&w=majority";

mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("db is connected"))
.catch((err)=>console.log("server is not connected due to ",err));



app.get("/allrooms",async(req,res)=>{
    try{
        const rooms = await roomModel.find({});
        res.send(rooms);
    }
    catch(err){
        res.send({msg:err.message});
    }
});

app.post("/addroom",async(req,res)=>{
    // const {name,
    //     maxcount,
    //     phone,
    //     rent,images,roomtype
    //     ,description} = req.body;
    try{
        const newRoom = await new roomModel(req.body);
        await newRoom.save();
        res.json(newRoom);

    }catch(err) {
        res.json({msg:err.message});
    }
})

app.get("/book/:id",async(req,res)=>{
    const result = await roomModel.find({_id:req.params.id});
    res.send(result)
})

app.post("/register",async(req,res)=>{
    const {name,email,password ,cpassword} = req.body;
    const findEmail = await UserMongo.findOne({email:email});
    if(!findEmail) {
        if(name,email,password,cpassword) {
            const newUser = await new UserMongo({name,email,password,cpassword});
            newUser.save()
            .then(res.send({msg:"register Successfully"}))
            .catch(err=>res.send({msg:"user not register due to ",err}))
        }else{
            res.send({msg:"all fields are mandatory"})
        }
    }
    
    else{
        res.send({msg:"email is already register"})
    }

})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const findEmail = await UserMongo.findOne({email:email});
    
    if(findEmail) {
        if(findEmail.password==password) {
            res.send({msg:"user login",name:findEmail.name,id:findEmail._id})

        }else{
            res.send({msg:"not a user or invalid details" })  
        }
    }else{
        res.send({msg:"not a user or invalid details" })
    }
    
})

app.post("/booking",async(req,res)=>{
    const {fromdate,todate,userid} = req.body;
    try {
    const newBooking = new bookingDb(req.body);
    const bookedInDb =  await newBooking.save();
    const roomDetail = await  roomModel.findOne({_id:req.body.roomid});
    roomDetail.currentbooking.push({bookingId:bookedInDb._id,fromdate,todate,userid,status:bookedInDb.status})
    await roomDetail.save();

    res.send({msg:"room booked succesfully"});
    } 
    
    catch (error) {
        res.send({msg:"room not book due to server issue"})
    }
})

app.listen(8080,()=>console.log("server is listing at 8080"));