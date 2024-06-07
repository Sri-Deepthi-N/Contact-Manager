var express=require('express')
var app=express()
app.use(express.json())
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://deepthi:XzECB1Mdq7c3H6Up@cluster0.gywnnad.mongodb.net/contact-manager').then(console.log("connected to mongo"))
var cors=require("cors")
app.use(cors())


//Creating schema
const listSchema = new mongoose.Schema({
    name:{type:String,required:true},
    mobileno:{type:Number,required:true},
    email:{type:String,required:true}
});


//Model
let List =mongoose.model("List",listSchema);


//Get
app.get("/list",async(req,res)=>{
    const list=await List.find();
    res.json(list);
});


//Add
app.post("/list",async(req,res)=>{
    const {name,mobileno,email}=req.body;
    const newlist=new List({name,mobileno,email});
    newlist.save();
    res.status(200).json(newlist)
});


//Update
app.put("/list/:id",async(req,res)=>{
    let id=req.params.id;
    const  itemtoupdate =await List.findByIdAndUpdate(id,req.body);
    if(!itemtoupdate) return res.status(404).send("No item found");
    res.status(200).json(itemtoupdate)
});


//Delete
app.delete("/list/:id",async(req,res)=>{
    let id=req.params.id;
    const  itemtodelete =await List.findByIdAndDelete(id,req.body);
    if(!itemtodelete) return res.status(404).send("No item found");
    res.status(200).json(req.body)
});

app.listen(3000,()=>{
    console.log("server Started ...")
})