import http from "http";
import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import path from "path";

const port = process.argv[2]; // Default to 9001 if no argument is given
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

server.listen(port, () => console.log(`✅ Replica running on port ${port}`));

const publicPath = "C:/Users/Administrator/Downloads/PortableGit/Panalotto-SPA/public";
console.log("📂 Serving index.html from:", path.join(publicPath, "index.html"));

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// 🌐 WebSocket Server for 9001
wss.on("connection", (ws) => {
    console.log(`🟢 WebSocket Client Connected on port ${port}`);

    ws.send(JSON.stringify({ event: "welcome", message: "Connected to Replica" }));

    ws.on("message", (message) => {
        console.log(`📩 Message from client: ${message}`);
    });

    ws.on("close", () => {
        console.log("🔴 WebSocket Client Disconnected");
    });
});

// 🔗 Connect to Master WebSocket Server (9000)
function connectToMaster() {
    const masterUrl = "ws://localhost:9000";
    const ws = new WebSocket(masterUrl);

    ws.on("open", () => {
        console.log(`✅ Connected to Master from Replica ${port}`);
        ws.send(JSON.stringify({ type: "REGISTER", replica: port }));
    });

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === "COUNTDOWN") {
                console.log(`⏳ Replica ${port} Countdown: ${data.data} seconds`);

                // Broadcast countdown update to all clients
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ event: "countdownUpdate", countdown: data.data }));
                    }
                });
            }
        } catch (error) {
            console.error(`❌ Error parsing message on Replica ${port}:`, error);
        }
    });

    ws.on("close", () => {
        console.error(`⚠️ Connection to Master lost! Retrying in 5 seconds...`);
        setTimeout(connectToMaster, 5000);
    });

    ws.on("error", (err) => {
        console.error(`⚠️ Replica ${port} WebSocket error:`, err.message);
    });
}

connectToMaster();
