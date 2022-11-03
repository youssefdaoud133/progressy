const mongoose = require("mongoose")
const g = console.log
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer")
// const sharp = require("sharp")
// const defult_avatar = require("../../images/User-avatar.svg.png")
// // upload photo
// const upload = multer({
    
//     limits : {
//         fileSize : 1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)){
//            return cb(new Error("jpg or jpeg or png only"))
//         }
//         cb(undefined,true)
//     }
// })
const userschema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        validate(v){
            if(v.length < 8){
                throw new Error("user name should e more than 8 character")
            }
        }

    },
    email : {
        type : String,
        required : true,
        validate(v){
            if(!validator.isEmail(v)){
                throw new Error("incorrect email")
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required: true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ],
    avatar : {
        type : Buffer
        
    },
    firstname : {
        type : String,
        default : 'First name'
    },
    lastname : {
        type : String,
        default : 'Last name'
    },
    address : {
        
            address: {
                type : String,
                 default : 'Address'
            },
            city : {
                type : String,
                 default : '',
            },
            country : {
                type : String,
                 default : '',
            },
            postalcode : {
                type : String,
                 default : '',
        }
    
},
    aboutme : {
        type : String,
        default: "statement is a brief paragraph or a few paragraphs that introduce you, your product or your company to others. "
    },
    university : {
               type : String,
               default : '',
    },
    work : {
               type : String,
               default : '',
    }
    
    
}
,{
    timestamps : true
}
) 


// dekete pass from client

userschema.methods.toJSON  = function(){
    const user = this.toObject()
    delete user.password
    delete user.tokens

    return user
}

// hash password before save

userschema.pre("save", async function(next){
    try{
        g("before save")
        this.password = await bcrypt.hash(this.password, 8)
        next()
    }catch(e){
        next(e)
    }
})


// generate auth

userschema.methods.generateauth = async function(){
    const token = jwt.sign({_id: this._id.toString()}, "myemailbro")
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}


//sign in

userschema.statics.loginfromdatabase = async function(email,password){
    const user = await User.findOne({email})
    if(!user){
        throw new Error()
    }
    // const validatepass = bcrypt.compare(password, user.password)
    const validatepass = bcrypt.compare(password,user.password)
    if(!validatepass){
         throw new Error()
    }
    return user
}






















const User = mongoose.model("User",userschema)















module.exports = User