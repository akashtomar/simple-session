const sessionCheck = (req,res, next) =>{
    if(req.session && req.session.user){
        next();
    }
    else{
        next({
            message: "Session Expired",
            type: "session"
        });
    }
}


module.exports = sessionCheck;