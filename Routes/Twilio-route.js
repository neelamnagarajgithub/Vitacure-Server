const express=require('express');
const TwilioRouter=express.Router();
const User=require('../models/usermodel');
const  dotenv=require('dotenv');
const jwt=require('jsonwebtoken');
dotenv.config({path:'./config.env'});
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
const client = require("twilio")(accountSid, authToken);


let user,OTP;

TwilioRouter.post('/signup',async(req,res)=>{
  
   try{
    const {username,number}=req.body;

    const ExistingUser=await User.findOne({number});
    if(ExistingUser) {
        return  res.status(400).json({
            status:"fail",
            message:"The Number is Already Existing",
        });
    }
   user=new User({
    username,
    number,
   });

   let digits="0123456789";
   OTP="";
   for(let i=0;i<4;i++) {
        OTP+=digits[Math.floor(Math.random()*10)];
   }
  
   await client.messages
   .create({
    body:`Your Otp verification Id for The User ${username} is ${OTP} `,
    messagingServiceSid:"MGf77b3dc4c1f09430dd07d69e2494fab5",
    to:number,
    channel:"sms"
   })
   .then(()=>{
    console.log("Message Sent Successfully");
   })
   res.status(200).json({
    message:"Message Sent Successfully"
  });
   }catch(err){
    res.status(404).json({
      status:"fail",
      message:err.message,
    })
   }
});

TwilioRouter.post('/signup/verify',async(req,res)=>{
  try{
    const {otp}=req.body;
    if(otp!=OTP) {
      return res.status(400).json({
        message:"Incorrect OTP",
      });
    }
    user=await user.save();
    const token=jwt.sign({id:user._id},"passwordKey");
    res.status(200).json({
      token,...user._doc,
    })
  }catch(err) {
    res.status(404).json({
      status:"fail",
      message:err.message
    })
  }
})

let Signinuser;

TwilioRouter.post('/signin',async(req,res)=>{
  
  try{
   const {number}=req.body;

    Signinuser=await User.findOne({number});
   if(!Signinuser) {
       return  res.status(400).json({
           status:"fail",
           message:"The Number is Doesn't Exists",
       });
   }
  let digits="0123456789";
  OTP="";
  for(let i=0;i<4;i++) {
       OTP+=digits[Math.floor(Math.random()*10)];
  }
 
  await client.messages
  .create({
   body:`Your Otp verification Id  is ${OTP} `,
   messagingServiceSid:"MGf77b3dc4c1f09430dd07d69e2494fab5",
   to:number,
   channel:"sms"
  })
  .then(()=>{
   console.log("Message Sent Successfully");
  })
  res.status(200).json({
   message:"Message Sent Successfully"
 });
  }catch(err){
   res.status(404).json({
     status:"fail",
     message:err.message,
   })
  }
});

TwilioRouter.post('/signin/verify/otp',async(req,res)=>{
  try{
    const {otp}=req.body;
    if(otp!=OTP) {
      return res.status(400).json({
        message:"Incorrect OTP",
      });
    }
    const token=jwt.sign({id:Signinuser._id},"passwordKey");
    res.status(200).json({
      token,...Signinuser._doc,
    })
  }catch(err) {
    res.status(404).json({
      status:"fail",
      message:err.message
    })
  }
})


module.exports=TwilioRouter;


// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+919492321818", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+919492321818", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });