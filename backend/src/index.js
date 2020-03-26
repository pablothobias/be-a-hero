const express = require("express");
const cors = require('cors');
const routes = require('./route');

const port = 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(port, ()=> {
    console.log(`running server on port http://localhost:${port}`)
});
