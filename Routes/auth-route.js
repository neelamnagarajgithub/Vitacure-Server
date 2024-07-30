const express=require('express');
const {Token_generator,authenticateToken} = require('../controllers/auth-controller.js');

const authRouter=express.Router();

authRouter.route('/login')
.post(Token_generator)

authRouter.route('/verify')
.post(authenticateToken)

module.exports=authRouter;