
const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware: JSON format mein aane wale data ko read karne ke liye
app.use(express.json());

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
app.get("/api/users", (req, res) => {
    return res.json(users);
});

// Same URL par multiple HTTP methods handle karna
app.route("/api/users/:id")

    // GET: ID ke through particular user find karna
    .get((req, res) => {
        const id = Number(req.params.id); // URL se ID lena

        const user = users.find(user => user.id === id); // ID match karna

        return res.json(user); // User ka data return karna
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
app.post("/api/users", (req, res) => {
    // TODO: Naya user create karna
    return res.json({ status: "pending" });
});

// Server ko start karna
app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
