const express = require("express");
const client = require("prom-client");

const app = express();
app.use(express.json());

const PORT = 3002;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

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