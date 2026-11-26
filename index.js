
const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const mongoose = require("mongoose");
// const { type } = require("os");
// const { json } = require("stream/consumers");
// const { error } = require("console");

const app = express();
const PORT = 8000;

// connection mongoose
mongoose
    .connect('mongodb://127.0.0.1:27017/youtube-app-1')
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log("mongo error", err));


// schema creation in mongodb
const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobtitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, { timestamps: true });


// model create
const User = mongoose.model("user", userschema);


// Middleware: JSON format mein aane wale data ko read karne ke liye
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// middleware hai ye with next function
// app.use((req, res, next) => {
//     console.log("hello from middleware 1");
//     return res.end("hey");
//     next();
// });


// app.use((req, res, next) => {
//     console.log("hello from middleare 2");
//     next();
// });


// Routes

// GET: Users ko HTML format mein browser par show karna
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});


// GET: Sabhi users ko JSON format mein return karna
// REST API
app.get("/api/users", (req, res) => {
    res.setHeader("X-Myname", "Sujeet Vishwakarma"); // custom header
    return res.json(users);
});


// Same URL par multiple HTTP methods handle karna
app.route("/api/users/:id")

    // GET: ID ke through particular user find karna
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);

        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        return res.json(user);
    })

    // PATCH: Existing user ki details update karna
    .patch((req, res) => {
        // TODO: ID ke through user edit karna
        return res.json({ status: "pending" });
    })

    // DELETE: Existing user ko delete karna
    .delete((req, res) => {
        // TODO: ID ke through user delete karna
        return res.json({ status: "pending" });
    });


// POST: Naya user create karna
app.post("/api/users", async (req, res) => {
    try {
        const body = req.body;

        console.log("BODY:", body);

        if (
            !body ||
            !body.first_name ||
            !body.last_name ||
            !body.email ||
            !body.gender ||
            !body.job_title
        ) {
            return res.status(400).json({
                msg: "All fields are required"
            });
        }

        const result = await User.create({
            firstname: body.first_name,
            lastname: body.last_name,
            email: body.email,
            gender: body.gender,
            jobtitle: body.job_title,
        });

        console.log("result", result);

        return res.status(201).json({
            msg: "User created successfully",
            user: result
        });

    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(409).json({
                msg: "Email already exists"
            });
        }

        return res.status(500).json({
            msg: "Something went wrong",
            error: error.message
        });
    }
});


// Server ko start karna
app.listen(PORT, () => console.log(`server started at PORT: ${PORT}`));
