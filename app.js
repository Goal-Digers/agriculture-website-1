const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
main().catch(err=>console.log(err));
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/agriuserDB');
    const farmerSchema=new mongoose.Schema({
        name:String,
        username:String,
        DOB:Date,
        age:Number,
        email:String,
        mobile:String,
        aadhar:String,
        address:String,
        City:String,
        State:String,
        pincode:String,
        Password:String
    });
    const Farmer=mongoose.model("Farmer",farmerSchema);

app.get("/",function(req,res){
   res.sendFile(__dirname+"/Homepage.html");
});
app.get("/signup.html",function(req,res){
res.sendFile(__dirname+"/signup.html")
});
app.get("/farmer.html",function(req,res){
    res.sendFile(__dirname+"/farmer.html");
});
app.post("/farmer.html",function(req,res){
    const farmer=new Farmer({
        name:req.body.name,
        username:req.body.name+"@farmer.in",
        DOB:req.body.dob,
        age:req.body.age,
        email:req.body.email,
        mobile:req.body.mobile,
        aadhar:req.body.aadhar,
        address:req.body.address,
        city:req.body.city,
        State:req.body.state,
        pincode:req.body.pincode,
        Password:req.body.password
    });
    farmer.save();
    res.redirect("/");
});
app.get("/customer.html",function(req,res){
    res.sendFile(__dirname+"/customer.html");
});
app.get("/business.html",function(req,res){
    res.sendFile(__dirname+"/business.html");
});
app.get("/student.html",function(req,res){
    res.sendFile(__dirname+"/student.html");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.post("/login.html",function(req,res){
    Farmer.findOne({email:req.body.email},function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if(foundUser.Password===req.body.password){
                    console.log(foundUser.Password);
                    res.redirect("/")       
                }else{
                    res.render("login",{flag:true})
                }
            }
        }
        });

})
app.listen(3000,function(){
    console.log("hey my server is running");
});
}