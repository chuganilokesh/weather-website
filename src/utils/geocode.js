const request=require("request")

const geocode=(address,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibG9rZXNoY2h1Z2FuaSIsImEiOiJja2ZydjdxMzgwNGNhMnRzOHpvaWUwenZtIn0.CKMeKWHxEKuuucuNPu78OQ&limit=1'

request({url,json:true},(error,{body})=>{ //destructured
if(error){
    callback("not able to connect with location services",undefined)
}
else if(body.features.length===0){
    callback('loaction you enterd is wrong',undefined)
}
else{
    callback(undefined,{
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
    })
   
}})
}
module.exports=geocode