const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const NurseRouter = require("./Routes/nurse-route");
const router = require("./Routes/chatbot-route");
const TwilioRouter = require("./Routes/Twilio-route");
const StripeRouter=require('./Routes/stripe-route');
const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());

app.use(cors({
  origin:"https://heal-connect.vercel.app",
  methods:['GET','POST'],
  credentials:true,
}))
// const whitelist = ['http://localhost:5173', 'https://heal-connect.vercel.app/'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   methods: ['POST', 'GET'],
//   credentials: true,
// };

// app.use(cors(corsOptions));

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log("DB Disconnected");
  });

app.use("/api/nurses", NurseRouter);
app.use("/api/chatbot", router);
app.use("/api/user", TwilioRouter);
app.use('/api',StripeRouter);
const port = process.env.PORT || 11000;

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
