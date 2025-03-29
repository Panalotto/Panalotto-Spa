import http from "http";
import express from "express";
import { WebSocketServer, WebSocket } from "ws";

import {setupWebSocket} from "./routesMaster/v1/countDown.js"

const PORT = process.env.PORT;
const isMainServer = PORT ==9000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
setupWebSocket(wss);
const clients = new Set();

wss.on("connection", (ws) => {
    console.log(`✅ Server [${PORT}] - Client Connected!`);
    clients.add(ws);

    ws.on("message", (message) => {
        console.log(`📩 Server [${PORT}] - Received: ${message}`);
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log(`🔴 Server [${PORT}] - Client Disconnected!`);
        clients.delete(ws);
    });
});

if (!isMainServer) {
    let mainSocket;
    let reconnectTimeout;

    function connectToMainServer() {
        console.log(`🔄 Server [${PORT}] Trying to connect to Main Server (9000)...`);
        mainSocket = new WebSocket("ws://localhost:9000");

        mainSocket.onopen = () => {
            console.log(`✅ Server [${PORT}] connected to Main Server (9000)`);
            clearTimeout(reconnectTimeout);
        };

        mainSocket.onmessage = (event) => {
            console.log(`📩 Server [${PORT}] received from Main Server:`, event.data);
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(event.data);
                }
            });
        };

        mainSocket.onclose = () => {
            console.log(`🔴 Server [${PORT}] disconnected from Main Server! Retrying in 5s...`);
            reconnectTimeout = setTimeout(connectToMainServer, 5000);
        };

        
        mainSocket.onerror = (err) => {
            console.error(`❌ Server [${PORT}] WebSocket Error:`, err.message);
            mainSocket.close();
        };
    }

    connectToMainServer();
}

// Serve Public Files
const publicPath = "C:/Users/Administrator/Downloads/PortableGit/Panalotto-SPA/public";
app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(`${publicPath}/index.html`);
});

server.listen(PORT, () => {
    console.log(`🚀 WebSocket Server running at ws://localhost:${PORT}`);
});
