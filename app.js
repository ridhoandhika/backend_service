const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors')
const route = require('./routes')
const morgan = require('morgan')

dotenv.config()

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routing
app.use(route) //base routing index.js

const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`server running in port ${port}`);
})