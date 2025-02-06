//create json wen token

import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    //returns a token that will use the sign method to create a token with the userId and the JWT_SECRET from the .env file. The token will expire in 7 days. 

    res.cookie("token", token, {
       httpOnly: true, //cannot be accessed by client side javascript 
       secure: process.env.NODE_ENV === "production", //cookie will only be sent over https in production
       sameSite: "strict", //prevents csrf
       maxAge: 7 * 24 * 60 * 60 * 1000,

    })

    return token;
}