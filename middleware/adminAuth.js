const adminAuth=(req,res,next)=>{
    try{
    if(req.user && req.user.role==='Admin'){
        next()
    }

else {
    console.log("You are not authorized")
    res.status(403).json({ message: 'Forbidden: Admin access only' });
}
    }
catch(error){
    console.log("adminAuth error",error)
    res.status(403).json({ message: 'Forbidden: Admin access only' });

}
}

module.exports={adminAuth}
