const mongoose=require('mongoose');
const validator=require('validator');

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide the username'],
    },
    number:{
        type:String,
        length:10,
        require:[true,'Please provide your phone Number']
    }
});

const user=new mongoose.model('User',UserSchema);

module.exports=user;