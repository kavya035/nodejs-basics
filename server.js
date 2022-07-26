const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const cookieParser = require("cookie-parser")
const dotEnv = require("dotenv").config();
const routes = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());
// app.use(cookieParser())

app.use("/", routes)

app.get("/",(req,res)=>res.send("hello from express"));
app.all("*", (req,res)=>res.send("that route doesn't exist"));

app.listen(port,()=>{
    console.log(`server is listening on port : http://localhost:${port}`);
});