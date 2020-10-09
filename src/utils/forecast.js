const request= require("request")


const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=e183699919e6177172b01e3cab1fae53&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"&units=m"
        request({url,json :true},(error,{body})=>{  //destructured
            if(error){
                callback("unable to connect weather services",undefined)
            }
            else if(body.error){
                callback("the location yu entered is wrong",undefined)
            }
            else{
                callback(undefined,{forecastdata:body.current.temperature+"°C", icon: body.current.weather_icons[0]})
            }
        })
        
    }
    module.exports=forecast