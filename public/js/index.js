const g = console.log

g("client side")
// window.localStorage.removeItem("token")
if(!window.localStorage.token){
    window.location.href = "/signup"
}
const test = document.querySelector(".testprofile")
const testusername = document.querySelector(".username")
const testage = document.querySelector(".age")
const loaduser = async () =>{
     const data = await axios.post("/user/getdata",{token : window.localStorage.token})
     testusername.innerHTML = data.data.username
     testage.innerHTML = data.data.age
    }


loaduser()





g(test)

