import express from "express";

const app = express();

// importing body-parser and cors
import bodyParser from "body-parser";
import cors from "cors"


// configure the dot env file
import 'dotenv/config'

// MongoDB Connection
import "./DB/db.js"
import router from "./Routers/authRouter.js";
import authrouter from "./Routers/productRouter.js";


const PORT = process.env.PORT || 9090;

app.get("/ping",(req,res)=>{
  res.send("PONG")
})


// Middleware for bodyParser to get the data from the body
app.use(bodyParser.json());
app.use(cors())


// Router 
app.use("/auth",router)
app.use("/product",authrouter)



app.listen(PORT,()=> {
  console.log(`Server Running At : ${PORT}`);
})



