var middlewareObj = {};
middlewareObj.isLoggedIn= function(req,res,next)
{return next();
}

module.exports=middlewareObj;