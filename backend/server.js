const express = require('express');
const request = require('request');
const app = express();
const cors= require("cors");

app.use(cors()) 
app.use(cors({
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: ['http://localhost:3003', 'http://localhost:4000']
}));


const API_KEY = '14e68b6a2f62b5a4cf1587f98b8cc40b';
const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Detroit', 'Portland', 'Memphis', 'Oklahoma City', 'Las Vegas', 'Louisville', 'Baltimore', 'Milwaukee'];
const ITEMS_PER_PAGE = 10;

app.get('/weather/:page', (req, res) => {
    let page = req.params.page;
    let startIndex = (page - 1) * ITEMS_PER_PAGE;
    let endIndex = startIndex + ITEMS_PER_PAGE;

    let requests = CITIES.slice(startIndex, endIndex).map(city => {
        return new Promise((resolve, reject) => {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
            request(url, (err, response, body) => {
                if(err){
                    reject(err);
                }else{
                    resolve(JSON.parse(body));
                }
            });
        });
    });

    Promise.all(requests)
        .then(responses => {
            
            res.json(responses);
        })
        .catch(err => {
            res.json({error: err});
        });
});
if(process.env.NODE_ENV== "production"){
    app.use(express.static("../build"))
}

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ',PORT);
});
