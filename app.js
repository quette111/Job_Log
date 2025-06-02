require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const authorizationMiddleware = require('./middleware/auth.js')

app.use(helmet());
app.use(cors({ origin: 'https://localhost1159', credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const appRoutes  = require('./routers/api.js'); // Import the router for serving JSON data
const loginRoutes = require('./routers/loginRoutes.js')

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https://img.logo.dev"],
      // add more as needed: styleSrc, connectSrc, etc.
    },
  })
);

// Serve static files from the 'public' folder
app.use(express.static('./public'));

// Use the API router for handling `/data.json` route
app.use('/api/v1/users', appRoutes);
app.use('/api/v1/login', loginRoutes)

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.render('index')

});

app.get('/index', (req, res) => {
  res.render('index')
})

app.get('/loginUser', (req, res) => {
  res.render('loginUser')
})

app.get('/log', (req, res) => {
res.render('log')
});

app.get('/signup', (req, res)=> {
  res.render('signUp')
})

app.get('/api/config', (req, res) => {
  res.json({
    apiKey: process.env.API_KEY,
  });
});

// Handle 404 for other routes
app.all('*', (req, res) => {
  res.status(404).send('Resource not found');
});

const start = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI, console.log('connected to DB'))
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

start()