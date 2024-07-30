const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config('../config.env');

const Token_generator=async(req,res)=>{
    const username=req.body.username;
    const data={name:username};
    const token=jwt.sign(data,process.env.JWT_ACCESS_TOKEN);
    res.status(200).json(token);
}

const authenticateToken=async(req,res,next)=>{
   const authheaders=req.headers['authorization'];
   const token=authheaders.split(' ')[1];
    jwt.verify(token,process.env.JWT_ACCESS_TOKEN,(err,user)=>{
        req.user=user;
       res.status(200).json(user)
        next()
    });

}

module.exports={Token_generator,authenticateToken};