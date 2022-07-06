var express         =require("express"),
    mongoose        =require("mongoose"),
    port            =process.env.PORT || 8000,
    app             =express(),

    methodOverride  =require("method-override")
    passport        =require("passport"),
    LocalStrategy   =require("passport-local"),
    User            =require("./models/user"),
    middleware      =require("./middleware/middleware.js"),
    bodyParser      =require("body-parser")

    app.use(methodOverride("_method"));
    app.use(bodyParser.urlencoded({extended:false}));

var indexRoute=require("./routes/index")

app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");


//ONLINE MONGODB ATLAS
const DB='mongodb+srv://admin:admin@cluster0.oun5l.mongodb.net/new';
mongoose.connect(DB).then(()=>{console.log('DATABASE CONNECTED to localhost:'+ port);}).catch((err)=> console.log('Database Not Connected'+err));

//Offline MONGO
//mongoose.connect("mongodb://localhost:27017/ttchannel").then( () => console.log("success")).catch((err)=>console.log(err));   

app.use(require("express-session")({
    secret:"Session for MissingX",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next)
{
    res.locals.currentUser=req.user;
    next(); 
});
app.use(indexRoute);

app.listen(port,function()
{
    console.log("server has started!");
});