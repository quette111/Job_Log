import 'dotenv/config';  

import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import appRoutes from './routers/api.js';
import loginRoutes from './routers/loginRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self';");
  next();
});


app.use('/api/v1/users', appRoutes);
app.use('/api/v1/login', loginRoutes)

app.use('/scripts', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https://img.logo.dev"],

    },
  })
);


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

app.get('/signup', (req, res) => {
  res.render('signUp')
})

app.get('/api/config', (req, res) => {
  res.json({
    apiKey: process.env.API_KEY,
  });
});



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