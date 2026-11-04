
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3003;

app.get("/", (req, res) => {
    res.send("Order Service is Running!");
});

app.get("/orders", (req, res) => {
    res.json([
        { id: 1, userId: 1, product: "Laptop", quantity: 1 },
        { id: 2, userId: 2, product: "Mobile", quantity: 2 }
    ]);
});

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
