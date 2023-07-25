// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.get('/api/fetchStockData', async(req, res) => {
    //YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    const stock_name = req.query.stock;
    const date = req.query.date;
    try {
        const response_data = await fetch(`https://api.polygon.io/v2/aggs/ticker/${stock_name}/range/1/day/${date}/${date}?apiKey=${process.env.API_KEY}`)
        const final_data = await response_data.json()
        res.status(200).send({stock:final_data.ticker,stats:final_data.results,status:final_data.status});
    } catch (error) {
        console.log(`Could not get response: ${error}`)
        res.status(500).send({status:500})
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));