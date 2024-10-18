import mongoose from "mongoose"

const mongoUrl = process.env.MONGO_DB;

mongoose.connect(mongoUrl).then(()=>{console.log("MongoDB CONNECTED !!");
}).catch((err)=>{
  console.log(`MongoDB CONNECTION ERROR : ${err} `)
})