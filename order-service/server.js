const express = require("express");
const client = require("prom-client");

const app = express();
app.use(express.json());

const PORT = 3003;

const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

app.get("/", (req, res) => {
    res.send("Order Service is Running!");
});

app.get("/orders", (req, res) => {
    res.json([
        { id: 1, userId: 1, product: "Laptop", quantity: 1 },
        { id: 2, userId: 2, product: "Mobile", quantity: 2 }
    ]);
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Order Service running on port ${PORT}`);
});