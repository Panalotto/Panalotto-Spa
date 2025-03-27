import http from "http";
import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import path from "path";

const port = process.argv[2] || 9001; // Default to 9001 if no argument is given
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

console.log(`✅ Replica running on port ${port}`);

const publicPath = "C:/Users/Administrator/Downloads/PortableGit/Panalotto-SPA/public";
console.log("📂 Serving index.html from:", path.join(publicPath, "index.html"));

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});


const server2Clients = new Set();

// connect to mainserver
let mainSocket;
let reconnectTimeout;

function connectToServer1() {
    console.log("🔄 Trying to connect to Server1...");
    mainSocket = new WebSocket("ws://localhost:9000");

    mainSocket.onopen = () => {
        console.log("✅ Server2 connected to Server1");
        clearTimeout(reconnectTimeout); // Stop reconnect if connected
    };

    mainSocket.onmessage = (event) => {
        console.log("🔵 Server2 received:", event.data);

        server2Clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(event.data);
            }
        });
    };

    mainSocket.onclose = () => {
        console.log("🔴 Server2 disconnected from Server1! Retrying in 5 seconds...");
        reconnectTimeout = setTimeout(connectToServer1, 5000); 
    };

    mainSocket.onerror = (err) => {
        console.error("❌ WebSocket Error:", err.message);
        mainSocket.close(); 
    };
}

connectToServer1();

wss.on("connection", (ws) => {
    console.log("✅ Server2: Client connected!");
    server2Clients.add(ws);

    ws.on("close", () => {
        console.log("🔴 Server2: Client disconnected!");
        server2Clients.delete(ws);
    });
});

// Start HTTP server (only once)
server.listen(port, () => {
    console.log(`🚀 Server2 running on http://localhost:${port}`);
    console.log(`🚀 WebSocket Server running on ws://localhost:${port}`);
});
