const g = console.log
const User  = require("../server/moduls/CRuser")
const jwt = require("jsonwebtoken")  

const auth = async (req,res,next) =>{
    try{
        const token = req.body.token
        const decode = jwt.verify(token,'myemailbro')
        const find_user = await  User.findOne({_id : decode._id,'tokens.token': token})
        if(!find_user){
            throw new Error() 
        }
        req.token = token
        req.user = find_user
        next()
    }catch(e){
        res.status(401).send(" you should auth")
    }
}

module.exports = auth