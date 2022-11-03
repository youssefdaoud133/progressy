const express = require("express")
const app = express()
const path = require("path")
// const path = require("../public")
const User = require("./moduls/CRuser")
const mongoose =require("mongoose")
const port = process.env.port || 3000
const hbs = require("hbs")
const publicdir = path.join(__dirname,"../public")
const auth = require("../middleware/auth")
// set hbs
app.set('view engine', 'hbs');
const viewstemplets = path.join(__dirname,"../views/layout")
app.set("views",viewstemplets)
app.use(express.static(publicdir))


app.use(express.json())

require("./moduls/db/mongoose")

//Sets handlebars configurations (we will go through them later on)
// app.engine('hbs', hbs({
//     layoutsDir: __dirname + '/views/layouts',
//     }));


// app.use(express.static(publicdir))
app.get("/",(req,res) =>{
    res.render("index" , {})
})
app.get("/MyProfile",(req,res) =>{
    res.render("MyProfile" , {})
})
app.get("/signup",(req,res) =>{
    res.render("signup" , {})
})

// create emails



app.post("/signup/createuser",async ({body},res)=>{
   try{
       const newuser = new User(body)
       const finaluser = await newuser.generateauth()
    //    await newuser.save()
        
       res.send(finaluser) 
   }catch(e){
    res.status(400).send()
   }

})


// get data

app.post("/user/getdata" , auth ,async (req,res) =>{
    try{
        res.send(req.user)
    }catch(e){}
})


// signin

app.post("/signup/signin" , async(req,res) =>{
    try{
        const user = await User.loginfromdatabase(req.body.email,req.body.password)
        const token = await user.generateauth()
        res.send(token)
    }catch(e){
        res.status(404).send()
    }
})


// update

app.patch("/MyProfile/changes" ,auth, async(req,res) =>{
    try{
        const user = req.user
        const keysobjs = Object.keys(req.body.newupdates)
        keysobjs.forEach((keysobj) =>{
            user[keysobj] = req.body.newupdates[keysobj]
        })

        // const update_user =
        await user.save()
        res.send(user)
    }catch(e){
        res.status(404).send()
    }
})



// upload avatar

const multer = require("multer")
// const sharp = require("sharp")

    const upload = multer({
        limits :  1000000,
    
     fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)){
            return cb(new Error("jpg or jpeg or png only"))
         }
         cb(undefined,true)
     }
    })


    app.post("/insertnew/avatar", auth,upload.single(req.body.avatar),async (req,res)=>{
       req.user.avatar = req.file.buffer
       await req.user.save()
       res.send()

    },(error,req,res,next) =>{
        res.status(400).send({error : error.message})
    })

























app.listen(port,() =>{
    console.log(`on port ${port}`)
}) 