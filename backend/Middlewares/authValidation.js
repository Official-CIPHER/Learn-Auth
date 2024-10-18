// Server side validation using joi
import joi from "joi"


// Sign Up validation
export const signupValidation = (req,res,next) => {
  const schema = joi.object({
    name: joi.string().min(3).max(25).required(),
    email: joi.string().email().required(),
    password: joi.string().min(4).max(25).required(),

  })

  // validate (whom to validate)
  const {error} = schema.validate(req.body);

  // If we get error
  if(error){
    return res.status(400).json({
      message: "BAD Sign Request !",
      error
    })
  }

  next();
}

export const loginValidation = async(req,res,next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(25).required(),
  })

  const {error} = schema.validate(req.body);

  // if we get error
  if(error) {
    return res.status(400).json({
      message:"BAD Login Request !",
      error
    })
  }

  next();

}


