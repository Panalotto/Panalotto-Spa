import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Serve a simple HTTP response
app.get("/", (req, res) => {
    res.send("✅ HTTP Server is running on port 3001!");
});

// WebSocket Connection
wss.on("connection", (ws) => {
    console.log("✅ WebSocket Client Connected");

    ws.on("message", (message) => {
        console.log("📩 Received:", message);
        ws.send(`📢 Echo: ${message}`);
    });

    ws.on("close", () => {
        console.log("❌ Client Disconnected");
    });
});

// Start Server
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
