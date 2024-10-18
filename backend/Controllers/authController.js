import { UserModel } from "../Models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const signup = async (req,res)=>{
    try {
      const {name,email,password} = req.body;

      // Finding the user on the basis of email
      const user = await UserModel.findOne({email});

      if(user) {
        return res.status(409).json({
          messsage: "User is already exist , you can login !",
          success: false
        })
      }

      const userModel = new UserModel({name,email,password})

      // hashing the password by using bcrypt
      userModel.password = await bcrypt.hash(password,10);
      await userModel.save();

      res.status(201).json({
        message:"SignUp Successfully !",
        success: true
      })
      
    } catch (error) {
      res.status(500).json({
        message:"Internal Server Error !",
        success: false
      })
    }
}


// Login Controller
export const login = async(req,res) => {
  try {
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});

    const errorMessage = "Authentication Failed ! Email or password is wrong ";

    if(!user){
      return res.status(403).json({
        message: errorMessage ,
        success: false
      })
    }

    // decrypt the password for checking the user using bcrypt compare(client password , database password)
    const isPasswordCorrect = await  bcrypt.compare(password,user.password)
    if(!isPasswordCorrect) {
      return res.status(403).json({
        message: errorMessage ,
        success: false
      })
    }

    // jsonwebtoken for generating th token after Successfully login
    const jwtToken =jwt.sign({
        email: user.email,
        id: user._id
    },
    process.env.JWT_SECRET,
    {expiresIn: "24h"}
  )
  // jwt.sign({payload},jwt_secret,expiresIn)
  // send this jwt token in response

  res.status(200).json({
    message: "Successfully Login !",
    success: true,
    jwtToken,
    email,
    name: user.name,
  })
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error !",
      success: false
    })
  }
}