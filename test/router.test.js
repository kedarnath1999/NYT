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

describe('/suggest route', () => {
    it('returns an empty array when no query is provided', async () => {
      const response = await request(app).get('/suggest');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]); 
    });
  
    it('returns suggestions when a valid query is provided', async () => {
      // This test assumes your application can handle a specific query and return a non-empty result.
      // You might need to mock axios to return a specific response or use a known query that will return results.
      const response = await request(app).get('/suggest?q=technology');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0); // Expect at least one suggestion
    });
  });