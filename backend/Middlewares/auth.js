import jwt from "jsonwebtoken"


export const authKaro = (req,res,next) => {
  // get the token from header
  const auth = req.headers['authorization']

  if(!auth) {
    res.status(403).json({
      message:"Not Authorized!"
    })
  }

  // decrypt the jwt expiresIn
  try {
    const decodeData = jwt.verify(auth, process.env.JWT_SECRET)

    req.user = decodeData;
    next();
  } catch (error) {
    res.status(403).json({
      message:"Unauthorized ! Token Expires"
    })
  }
}