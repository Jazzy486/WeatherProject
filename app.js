const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/",function(req, res){

    res.sendFile(__dirname+"/index.html");
    
    
});

app.post("/",function(req,res){

    
    const query = req.body.cityName;
    const apiKey = "{your api key}";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+ units;
    https.get(url,function(response){
        
        response.on("data",function(data){
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
            const description = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const imageURL = 'http://openweathermap.org/img/wn/'+icon+'@2x.png';
            
            res.write("<h1>The temperature in "+query+" is " +temp +  "</h1>");
            res.write("<h3>The weather is showing "+ description + "</h3>"); 
            res.write("<img src="+imageURL+">");
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("Server running at port 3000");
})