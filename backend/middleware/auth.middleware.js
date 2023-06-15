const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"userdata",(err,decoded)=>{
            if(decoded){
                req.body._id = decoded._id;
                next();
            }else{
                res.send("login please");
            }
        })
    }else {
        res.send("login please");
    }
}


module.exports={
    authenticate
}