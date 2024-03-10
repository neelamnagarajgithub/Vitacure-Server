const dotenv=require('dotenv');
dotenv.config({path:'../config.env'});
const stripe=require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const Nurse=require('../models/nursemodel');

exports.getCheckoutSession=async(req,res,next)=>{
    const nurse=await Nurse.findById(req.params.nurseid);

   const session=await stripe.checkout.session.create({
        payment_method_types:['card'],
        success_url:`${req.protocol}://${req.get('host')}/`,
        cancel_url:`${req.protocol}://${req.get('host')}/nurse/${nurse.slug}`,
        customer_email:req.user.email,
        client_reference_id:req.params.nurseid,
        line_items:[
            {
                name:`${nurse.name}`,
                description:`${nurse.typeofcare}`,
                 amount:500,
                 currency:'inr',
                 qunatity:1,
            }
        ]
    });
    res.status(200).json({
       status:"success",
       session,
    })
  
}


