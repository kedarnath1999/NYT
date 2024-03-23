// imports
require("dotenv").config();
const express = require('express');

const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from public directory
app.use(express.static('public'));

// Routs set up
app.use("",require("./routes/routes"))


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
