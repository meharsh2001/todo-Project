var express=require("express");
const { userInfo } = require("os");
var message = {
    type: '',
    intro: '',
    message: ''};   
var router=express.Router();
alluser            =require("../models/user.js"),
middleware = require("../middleware/middleware.js");

router.use(require('flash')());

//HOME
router.get("/",function(req,res)
{   
    res.render("home");
});

//HOME
router.get("/API", middleware.isLoggedIn,function(req,res)
{   var UserAPI = {
    id: req.user.id,
    username: req.user.username}; 
            res.status(200).json(UserAPI);
});

// REGISTER
router.post("/register",function(req,res)
{ 
  var newUser=new User({      username:req.body.username    });
  User.register(newUser,req.body.password,function(err,user){
      if(err)
      {   console.log(err);
          res.redirect("/registerfailed")
      } else{
          passport.authenticate("local")(req,res,function()
          {  
              res.locals.currentUser=req.user;
              res.redirect("/myaccount");
          });      }  });});

//LOGIN
router.post("/login",passport.authenticate('local',{
  successRedirect:'/myaccount',
  failureRedirect:"/loginfailed"
}
)
);


//HOME
router.get("/tour",function(req,res)
{
    res.redirect("/");
});

//MYACCOUNT    
router.get("/myaccount", middleware.isLoggedIn,function(req,res)
{
    alluser.find({},function(err,alluser){
        res.render("myaccount",{alluserlist: alluser})});});

//DEL USER    
router.get("/myaccount/deleteuser/id86594949684511491494694549648", middleware.isLoggedIn,function(req,res)
{
    console.log(req.user.id);
    a.findByIdAndRemove(req.user.id,(err) => {
        if(err)
        {
            console.log("error","Following error encountered : " +err);
       
        }
        else{
          console.log("<==ID","Success! User Deleted");
          
        } });
        res.redirect("/thanks");

});

//LOGINFAILED
router.get("/loginfailed",function(req,res)
{
    message = {
        type: 'danger',
        intro: 'LOGIN FAILED! ',
        message: 'The details you entered is not connected to any account. Contact Customer Care Or Register Below!'};
    res.redirect("/login");
});
//REGISTERFAILED
router.get("/registerfailed",function(req,res)
{
    res.render("registerfailed");
});

//REgISTER
router.get("/register",function(req,res)
{
    res.render("register");
});

// login
router.get("/login",function(req,res)
{
    res.render("login",message);
});


//signout
router.get("/logout",function(req,res)
{
    req.logout();
    res.redirect("/");
});

module.exports = router;

