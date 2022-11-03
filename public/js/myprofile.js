const g = console.log
let imagepath
let chk = false 
g("this is client side (profile sitting)")
let allchanges = []
const btnchange = document.querySelector("#btnchange") 
const image_input = document.querySelector("#image_input")
const actualBtn = image_input;

const fileChosen = document.getElementById('file-chosen');
const bodyformdata = new FormData()

const chpic = async() =>{
//    await axios({
//         method: "post",
//         url: "/insertnew/avatar",
//         data: bodyformdata,
//         // body : {token : window.localStorage.token},
//         headers: { "Content-Type": "multipart/form-data" },
//       })
      await axios.post("/insertnew/avatar",{
        token : window.localStorage.token,
        bodyformdata
      })
}

image_input.addEventListener('change', function(){
    imagepath = this.files[0].name
    bodyformdata.append('avatar', imagepath); 
    bodyformdata.append('token', window.localStorage.token); 
    chpic()
})


// image_input.click()
let oldinformation , information = {
            
        welcomephrase : document.querySelector(".display-2"),
        username : document.querySelector("#input-username") ,
        email : document.querySelector("#input-email"),
        firstname : document.querySelector("#input-first-name") ,
        lastname : document.querySelector("#input-last-name") ,
        address : {address : document.querySelector("#input-address"),
        city : document.querySelector("#input-city"),
        country : document.querySelector("#input-country"),
        postalcode : document.querySelector("#input-postal-code"),
        },
        
        
        aboutme : document.querySelector("#texrtarea-aboutme"),
        university : document.querySelector("#input-University"),
        universitytxt : document.querySelector("#University"),
        worktxt : document.querySelector("#work"),
        nameandage : document.querySelector("#nameandage"),
        work : document.querySelector("#input-work"),
        cityandcountry : document.querySelector("#cityandcountry"),
}
const loaduser = async () =>{
    const data = await axios.post("/user/getdata",{token : window.localStorage.token})
    information.welcomephrase.innerHTML = `Hello ${data.data.username}`
    information.universitytxt.innerHTML = `University of ${data.data.university}`
    information.worktxt.innerHTML = `Works For -  ${data.data.work}` 
    information.cityandcountry.innerHTML = `<i class="ni location_pin mr-2"></i>${data.data.address.city}, ${data.data.address.country}` 
    information.nameandage.innerHTML = `${data.data.username}<span class="font-weight-light">, ${data.data.age}</span>`
    information.username.value = data.data.username
    information.email.value = data.data.email
    information.firstname.value = data.data.firstname
    information.lastname.value = data.data.lastname
    information.address.address.value = data.data.address.address
    information.address.city.value = data.data.address.city
    information.address.country.value = data.data.address.country
    information.address.postalcode.value = data.data.address.postalcode
    information.aboutme.value = data.data.aboutme
    information.university.value = data.data.university
    information.work.value = data.data.work

   }


   loaduser()


const checkchange = async(e) =>{
    
    const key = e.srcElement.defaultValue
    if (!allchanges.includes(key)){
        if(key === "address" || key === "city"||key === "country" || key === "postalcode"){
             allchanges.push("address","country","city","postalcode")
        }else{
        allchanges.push(key)
        }
    }
    

}















information.username.addEventListener("click" , checkchange)
information.firstname.addEventListener("click" , checkchange)
information.lastname.addEventListener("click" , checkchange)
information.address.address.addEventListener("click" , checkchange)
information.address.city.addEventListener("click" , checkchange)
information.address.country.addEventListener("click" , checkchange)
information.address.postalcode.addEventListener("click" , checkchange)
information.aboutme.addEventListener("click" , checkchange)
information.university.addEventListener("click" , checkchange)
information.work.addEventListener("click" , checkchange)





const changeinf = async(e) =>{
    e.preventDefault()
    let chk = false
    let finalchangeobj = {}
    let finalchangeobjedit = {address : {}}
    allchanges.forEach(async (allchange) =>{
        if(allchange === "address" || allchange === "city"||allchange === "country" || allchange === "postalcode"){
           
            finalchangeobjedit.address[allchange] = information.address[allchange].value
            // const data = await axios.patch("/MyProfile/changes",{token : window.localStorage.token , newupdates :finalchangeobjedit})
            //   g(data)
            // loaduser()
        }else{
        finalchangeobj[allchange] = information[allchange].value
        // const data = await axios.patch("/MyProfile/changes",{token : window.localStorage.token , newupdates :finalchangeobj})
       
        

       }
    })
    let merged
    if(finalchangeobjedit.address.address){
         merged = {...finalchangeobj, ...finalchangeobjedit};
    }else{
         merged = {...finalchangeobj};
    }
    g(finalchangeobj)
     const data = await axios.patch("/MyProfile/changes",{token : window.localStorage.token , newupdates :merged})
     loaduser()

     allchanges= []

    g(data)
   
} 


btnchange.addEventListener("click" , changeinf)