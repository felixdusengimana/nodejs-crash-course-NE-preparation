const {connectToDB} = require("./src/config/db")
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
swaggerDocument = require('./swagger.json');

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerSpecification = swaggerJsdoc(swaggerDocument);

const port = process.env.PORT || 5000
connectToDB()


const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification));

app.get("/", (req, res)=>{
    res.send("Welcome to NE preparation APIs")
})

require("./src/routes/user.router")(app);

app.listen(port, ()=>{
    console.log(`Application running on port ${port}`);
})