require("dotenv").config();
const express = require("express");
const axios = require('axios');
const router = express.Router()
const apiKey = process.env.API_KEY

router.get('/suggest', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.json([]);
    }
    apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${apiKey}`;
    try {
        const response = await axios.get(apiUrl);
        articles = query ? response.data.response.docs : response.data.results;
        const suggestions = articles.map(article => ({
            title: article.headline.main,
            url: article.web_url
        }));
        res.json(suggestions);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.send('Failed to fetch articles');
    }
});


router.get('/', async (req, res) => {
    const query = req.query.query;
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Number of articles per page
    const offset = (page - 1) * limit;
    let apiUrl;
    let articles;
    if (query) {
        // If there's a search query, use the Article Search API
        apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${apiKey}`;
    } else {
        // If there's no query, fetch top stories
        apiUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiKey}`;
    }

    try {
        const response = await axios.get(apiUrl);
        if(!query)
        {
            articles = response.data.results.slice(offset, offset + limit);
            const maxPages = Math.ceil(response.data.results.length / limit);
            res.render('index', { articles: articles, query: '', page: page, maxPages: maxPages });
        }
        else{
            articles = query ? response.data.response.docs : response.data.results;
            res.render('index', { articles: articles, query: query || '' });
        }
        
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.send('Failed to fetch articles');
    }
});

router.get('/news',(req,res) => {
    res.render("news")
})



module.exports = router;
