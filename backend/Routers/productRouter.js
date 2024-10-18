import express from "express"
import { authKaro } from "../Middlewares/auth.js";

const authrouter = express.Router();

authrouter.get("/",authKaro,(req,res)=>{

  // console.log(`--------logged in user details --------- :`, req.user);
  

  res.status(200).json([
    {
      name: "Mobile",
      price: 10000
    },
    {
      name: "Watch",
      price: 5000
    }
  ])
})

export default authrouter;