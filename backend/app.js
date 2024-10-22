const express = require('express');
const app = express();//object for express app
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
//to merge env to this root file so all fold/files can access env variable 
//need path package to give absolute path else result in undefined
dotenv.config({ path: path.join(__dirname, "config/config.env") });

//middlewares
app.use(express.json());//to make the express server to accept the json data as request  
app.use(cookieParser());//to get browser cookie data in req
//path npm to give absolute path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')
//middlewares used
app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);
app.use('/api/v1/', payment);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
//error middleware used lastly because at last after all middleware we can find its error
//global error handler
app.use(errorMiddleware)

module.exports = app;