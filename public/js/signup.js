const g =console.log
g("this is client side")

if(window.localStorage.token){
    window.location.href = "/"
}


const upbtn = document.getElementById("upbtn")
const inbtn = document.getElementById("inbtn")
  


let data;




const signup = async function (e){
    e.preventDefault()
    data= { 
        username: document.querySelector("#usernamewhensignup").value,
        email: document.querySelector("#emailwhensignup").value,
        password: document.querySelector("#paswdwhensignup").value,
        // password: document.querySelector("#paswdwhensignup").value,
        age: document.querySelector("#agewhensignup").value
    }
    axios.post("/signup/createuser",data
    ).then((v) =>{window.localStorage.token =  v.data
        window.location.href = "/"
    }).catch((e) =>{
        g(e)
    })
   
    setTimeout(() =>{
       
        g(data)
    },2000)
    

}

/////////////////////////////////////////


const signin = async function (e){
    e.preventDefault()
    data= { 
        // username: document.querySelector("#usernamewhensignup").value,
        email: document.querySelector("#emailwhensignin").value,
        password: document.querySelector("#paswdwhensignin").value,
        // password: document.querySelector("#paswdwhensignup").value,
        // age: document.querySelector("#agewhensignup").value
    }
    axios.post("/signup/signin",data
    ).then((v) =>{window.localStorage.token =  v.data
        window.location.href = "/"
    }).catch((e) =>{
        g(e)
    })
    g(data)
    

}


















upbtn.addEventListener("click" , signup)
inbtn.addEventListener("click" , signin)