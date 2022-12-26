const headerInput=document.querySelectorAll(".headerInput input")
const headerbtn=document.querySelector(".btn")
const errorSpan=document.querySelector(".errorSpan")
const goods = document.querySelector(".goods")
const creatBtnDiv = document.querySelector(".creatBtn")
const onlyImg = document.querySelector(".onlyImg")
const btnOut = document.querySelector(".btnLogOut")
const all = document.querySelector("#All")
const creatImg=document.querySelector(".creatImg")


let user = {
    username: 'kminchelle',
    password: '0lelplR'
}

let arr=[]
headerbtn.addEventListener("click",()=>{
  if(headerInput[0].value===user.username && headerInput[1].value===user.password) {
    saveLocal()
    creatProducts()
    header.style.display="none"
    btnOut.style.display="block"
    all.style.display="block"
    
  }else {
   errorSpan.innerHTML= "username or password is incorrect";
   for (let i = 0; i < headerInput.length; i++) {
    headerInput[i].classList.add("activeBorder")
    errorSpan.style.color="red" 
    }
  }
  // else if(headerInput[0].value!==user.username){
  //   errorSpan.innerHTML="filled not correctly"
  //   headerInput[0].classList.add("activeBorder")
  //   errorSpan.style.color="red" 
  // }else if(headerInput[1].value!==user.password){
  //   errorSpan.innerHTML="filled not correctly"
  //   headerInput[1].classList.add("activeBorder")
  //   errorSpan.style.color="red" 
  // }
 
})

function saveLocal() {
  let xhr=new XMLHttpRequest()
xhr.open("POST",' https://dummyjson.com/auth/login')
xhr.setRequestHeader('Content-type', 'application/JSON; charset="UTF-8"')
xhr.onload=(response) => {
 localStorage.setItem("usersInform", JSON.stringify(JSON.parse(response.target.response)))

 }
xhr.send(JSON.stringify({
  username: 'kminchelle',
  password: '0lelplR'
}))

}

function creatProducts(){
  let xhr=new XMLHttpRequest()
  xhr.open("GET",'https://dummyjson.com/products')
  xhr.onload=(photoFunction)=>{
    let allImages=JSON.parse(photoFunction.target.response);
    
       allImages.products.forEach((product) =>{
        let newDiv=document.createElement("div")
        newDiv.setAttribute("class","newDivActive")
        newDiv.innerHTML=`<h2>${product.title}</h2> <img src="${product.images[1]}"><img src="${product.thumbnail}"><p>${product.description}</p> <h4>$ ${product.price}</h4>`
        goods.append(newDiv)     
    })
}
     xhr.send()  
     let xhr1=new XMLHttpRequest()
     xhr1.open("GET",'https://dummyjson.com/products/categories')
     xhr1.onload=(response)=>{
      let creatBtn=JSON.parse(response.target.response)
   
      creatBtn.forEach((item) =>{
       let newButton=document.createElement("button")
       newButton.innerHTML=`${item}`
       newButton.setAttribute("class","activeBtn")
       creatBtnDiv.append(newButton)
     })
  
     let buttonClick=document.querySelectorAll(".activeBtn")
     buttonClick.forEach(element =>{
      element.addEventListener("click",()=>{
        creatImg.innerHTML=""
        goods.style.display="none"
        buttonClick.forEach(element =>{
          element.classList.remove("btnActiveColor")
        })
        element.classList.add("btnActiveColor")
        
        if(element.innerHTML==="All"){
          let xhr=new XMLHttpRequest()
          xhr.open("GET",'https://dummyjson.com/products')
          xhr.onload=(photoFunction)=>{
            let allImages=JSON.parse(photoFunction.target.response);
            
               allImages.products.forEach((product) =>{
                let newDiv=document.createElement("div")
                newDiv.setAttribute("class","newDivActive")
                newDiv.innerHTML=`<h2>${product.title}</h2> <img src="${product.images[1]}"><img src="${product.thumbnail}"><p>${product.description}</p> <h4>$ ${product.price}</h4>`
                creatImg.append(newDiv)     
            })
        }
             xhr.send()  
        }else{
          let xhr=new XMLHttpRequest()
          let a=element.innerHTML
          xhr.open("GET",`https://dummyjson.com/products/category/${a}`)
          xhr.onload=(response) => {
             JSON.parse(response.target.response).products.forEach((item)=>{
            let myDiv=document.createElement("div")
            myDiv.innerHTML=`<h2>${item.title}</h2> <img src="${item.images[0]}"> <img src="${item.thumbnail}"><p>${item.description}</p> <h4>$ ${item.price}</h4>`
            creatImg.append(myDiv)  
          })
        }
            xhr.send()
        }
   
      })
     })
     }
     xhr1.send()   
}

btnOut.addEventListener("click",()=>{
  goods.style.display="none"
  btnOut.style.display="none"
  all.style.display="none"
  header.style.display="block"
  creatBtnDiv.style.display="none"
  creatImg.style.display="none"
  headerInput[0].innerHTML=""
  headerInput[1].innerHTML=""
})
