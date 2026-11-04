
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3002;

app.get("/", (req, res) => {
    res.send("Product Service is Running!");
});

app.get("/products", (req, res) => {
    res.json([
        { id: 1, name: "Laptop", price: 50000 },
        { id: 2, name: "Mobile", price: 20000 }
    ]);
});

app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
});
