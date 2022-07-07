var express         =require("express"),
    port            =process.env.PORT || 8000,
    app             =express(),
    methodOverride  =require("method-override"),
    bodyParser      =require("body-parser")

    app.use(methodOverride("_method"));
    app.use(bodyParser.urlencoded({extended:false}));


app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");


app.use(require("express-session")({
    secret:"Session",
    resave:false,
    saveUninitialized:false
}));


//HOME
app.get("/",function(req,res)
{   
    res.render("home");
});

//MYACCOUNT    
app.get("/myaccount",function(req,res)
{
    res.render("myaccount")});


//REgISTER
app.get("/register",function(req,res)
{
    res.render("register");
});

app.listen(port,function()
{
    console.log("http://localhost:"+port+"/");
});