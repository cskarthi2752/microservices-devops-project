const express = require("express");
const client = require("prom-client");

const app = express();
app.use(express.json());

const PORT = 3001;

// Prometheus Registry
const register = new client.Registry();

client.collectDefaultMetrics({ register });

// HTTP request counter
const httpRequestCounter = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
    registers: [register]
});

// Request tracking middleware
app.use((req, res, next) => {
    res.on("finish", () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.path,
            status_code: res.statusCode
        });
    });
    next();
});

app.get("/", (req, res) => {
    res.send("User Service is Running!");
});

app.get("/health", (req, res) => {
    res.json({
        service: "user-service",
        status: "UP"
    });
});

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Karthik", email: "karthik@gmail.com" },
        { id: 2, name: "Arun", email: "arun@gmail.com" }
    ]);
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`User Service running on port $DIL1`);
});
