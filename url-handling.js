// HTTP server create karne ke liye http module import kiya.
const http = require("http");

// Files ke saath kaam karne ke liye fs module import kiya.
const fs = require("fs");

// URL ko parse karne ke liye url module import kiya.
const url = require("url");

// HTTP server create kiya jo har incoming request handle karega.
const myserver = http.createServer((req, res) => {

    // Browser ki favicon request ko ignore karke response end kar diya.
    if (req.url === "/favicon.ico") return res.end();

    // Current timestamp aur requested URL ko combine karke log banaya.
    const log = `${Date.now()}: ${req.url}`;

    // Requested URL ko parse karke uske parts nikale.
    const myurl = url.parse(req.url);

    // Parsed URL ko terminal mein print kiya.
    console.log(myurl);

    // Request ka record log.txt file mein add kiya.
    fs.appendFile("log.txt", log + "\n", (err) => {

        // File operation mein error aane par error response bheja.
        if (err) {
            res.statusCode = 500;
            return res.end("Internal Server Error");
        }

        // Root URL par Home Page response bheja.
        if (myurl.pathname === "/") {
            res.end("Home Page");

        // About URL par About Page response bheja.
        } else if (myurl.pathname === "/about") {
            res.end("About Page");

        // Home URL par Home URL response bheja.
        } else if (myurl.pathname === "/home") {
            res.end("Home URL");

        // Baaki sabhi URLs par 404 response bheja.
        } else {
            res.statusCode = 404;
            res.end("Page Not Found");
        }
    });
});
myserver.listen(3000, () => console.log("recieved"));