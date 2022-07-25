const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");
const app = express();
const router = require('./router/index')
require('./model')
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Hello World");
});


app.use('/api', router)
app.use(errorHandler());
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
