const request = require('supertest');
const express = require('express');
const router = require('C:/Users/Dell/Desktop/NYT/NYT/routes/routes.js'); 

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

// Mock EJS render method
app.set('view engine', 'ejs');
app.set('views', './views');

describe('Top Stories Functionality', () => {
    test('It should respond with the index view and top stories', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
    });
});
