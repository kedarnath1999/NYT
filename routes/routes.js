require("dotenv").config();
const express = require("express");
const axios = require('axios');
const router = express.Router()
const apiKey = process.env.API_KEY


router.get('/', async (req,res) => {
    try {
        const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}
        `);
        const articles = response.data.results;
        res.render('index', { articles: articles });
    } catch (error) {
        console.error(error);
        res.send('An error occurred');
    }
})

router.get('/news',(req,res) => {
    res.render("news")
})



module.exports = router;
