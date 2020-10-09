console.log("client side javascript file wrking")


const weatherForm=document.querySelector('form') 
const search=document.querySelector('input') 
const messageOne=document.querySelector('#message-one') 
const messageTwo=document.querySelector('#message-two') 
const icon= document.querySelector('.icon')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value

   messageOne.textContent="loading..."
    messageTwo.textContent=""
    icon.textContent=""
    fetch('/weather?address='+location).then((response)=>{
    
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecastdata
           // icon.src= "data.icon"  tried but didnt worked need to learn
                       

        }
    })
})
})