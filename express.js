const express = require("express");

const app = express();

// express js methof fro creating all the server very efficiently
app.get("/", (req, res) => {
    return res.send(`hello ${req.query.name}`);
});

app.get("/about", (req, res) => {
    return res.send("hello from about page" );
});

app.get("/signup", (req, res) => {
    return res.send("hello i am signup method");
});
app.get("/home", (req, res) => {
    return res.send("am from hpome what your about");
});

app.get("/game", (req, res) => {
    return res.send("am from game what is your about");
})
app.post("/name", (req, res) => {
    return res.send("post methpod call");
})
 

app.listen(8000, () => console.log("server started"));