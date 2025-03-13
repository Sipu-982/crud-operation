const mongoose=require("mongoose")
const UserSchema=new mongoose.Schema({
    name:String,
    mail:String,
    phone:String,
    age:Number
})
const UserModel=mongoose.model("createuser",UserSchema)
module.exports=UserModel