import jwt  from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        })

    res.cookie("token", token,
    {
      httpOnly: true, // saves from xss attacks
      secure: process.env.NODE_ENV === "production", // only works on https
      sameSite: "strict", // procts from csrf
      maxAge: 7 * 24 * 60 * 60 * 1000,//milliseconds or 7days
    });

    return token;
}