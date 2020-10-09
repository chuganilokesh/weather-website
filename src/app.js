const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')


const app=express()

//defining path for express configuration
const viewPath= path.join(__dirname,'../templates/views')
const publicDirectoryPath=path.join(__dirname,'../public')
const partialsPath= path.join(__dirname,'../templates/partials')
//setup handlebars engine and view locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'lokesh'
    })
})
app.get('/about',(req,res)=>{
res.render('about',{
    title:'About me',
    name:'lokesh'
})
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'lokesh'
    })
    })

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"you must provide an address"
        })
    }
    const address=req.query.address
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error:error})
        }
      
          forecast(latitude,longitude,(error,{forecastdata,icon})=>{
              if(error){
                return res.send({error:error})
              }
              res.send({location:location,forecastdata:forecastdata,icon:icon})
              
            
          })
          })

    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:"must provide search term"
        })
    }

   // req.query()
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:"lokesh",
        errorMessage:'Help article not found'
    })
    })
app.get('*',(req,res)=>{
res.render('404',{
    title:404,
    name:"lokesh",
    errorMessage:'Page not found'
})
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})