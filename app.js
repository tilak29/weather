const express = require("express");
const app = express();

const https = require("https");

const port = 3000;


app.get('/' , function(req, res){
  res.send("<h1>not available</h1>")
})


// app.get("/api/weather/" , function(req , res){
//   res.send("<h1>not available.</h1>")
// })

app.get("/api/weather" , function(req , res){
    var city = req.query.city;
    // res.json(req.params);

    const apiKey = "b30cedbb810e9c7d3d2ab4d5831ccaf0";
      
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";
  
    https.get(url , function(response){
      console.log(response.statuscode);
  
      response.on("data" , function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
  
      console.log(temp);

      res.send("<h1>Temp in " +city+ " is "+temp+ " celcius</h1>");
  
    })
    })
  });

  // app.get('*', function (req, res) {
  //   res.send("<h1>page not found</h1>");
  // });

  app.use("*", (req, res, next) => {
    const err = Error(`Requested path ${req.path} not found`);
    next(err);
  });
  
  
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





//query = https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js/11818691#11818691
//parametre = https://stackoverflow.com/questions/6912584/how-to-get-get-query-string-variables-in-express-js-on-node-js/37454870#37454870
