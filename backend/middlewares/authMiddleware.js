import jwt from "jsonwebtoken";

const authenticate = (req,res,next)=>{
    const token =req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({error: "Access Denied"});

    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decoded.userId;
        
        next();

    }catch{
        res.status(401).json({error:"Invalid token"});
    }
};
export default authenticate;