import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { setupWebSocket } from "./routesMaster/v1/countDown.js";

const publicPath = "C:/Users/Administrator/Downloads/PortableGit/Panalotto-SPA/public";



const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

setupWebSocket(wss);


console.log("Serving index.html from:", path.join(publicPath, "index.html"));

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});



const subscribers = new Set();


wss.on("connection", (ws) => {
    console.log("✅ Server1: Subscriber connected!");
    subscribers.add(ws);


    ws.on("close", () => {
        console.log("🔴 Server1: Subscriber disconnected!");
        subscribers.delete(ws);
    });
});

// Start the server
const PORT = 9000;
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🚀 WebSocket Server running on ws://localhost:9000`);
});
