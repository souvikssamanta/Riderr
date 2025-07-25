const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
fullname:{
    firstname:{
        type:String,
        required:true,
        minlength:[3,'first name must be atleast 3 chracter long']
    },

    lastname:{
        type:String,
        minlength:[3,'last name must be atleast 3 chracter long']
    },
},
email:{
type:String,
required:true,
unique:true,
minlength:[5,'email must be atleast 5 chracter long']

},
password:{
        type:String,
        requred:true,
        select:false
},
socketId:{

    type:String,
},

})
userSchema.methods.generateAuthtoken=function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{ expiresIn: '24h' }
    );
    return token;
}
userSchema.methods.comparePassword=async function(password){
return await bcrypt.compare(password,this.password)


}
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}
const userModel=mongoose.model('user',userSchema);
module.exports=userModel





