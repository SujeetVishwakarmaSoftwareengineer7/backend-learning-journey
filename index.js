 const http = require("http");
const fs = require("fs");
const url = require( "url");


const myserver = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url}`;
    fs.appendFile("log.txt", log, (err, data) => {
        if (req.url == '/') { 
            res.end("clicked / url");
        } else if (req.url == '/about') {
            res.end("you have clicked about  url");
        } else if (req.url == '/home') {
            res.end(" you have clicked home url");
        } else {
            res.end("404");
        }
    });
});
myserver.listen(8000, () => console.log("server started"));