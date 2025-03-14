import http from "http";
import express from "express";
import { WebSocket } from "ws";
import path from "path";

const port = process.argv[2]; 
const app = express();
const server = http.createServer(app);

server.listen(port, () => console.log(`Replica running on port ${port}`));

const publicPath = "C:/Users/Administrator/Downloads/PortableGit/Panalotto-SPA/public";

console.log("Serving index.html from:", path.join(publicPath, "index.html"));

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

function connectToMaster() {
    const masterUrl = "ws://localhost:9000";
    const ws = new WebSocket(masterUrl);

    ws.on("open", () => {
        console.log(`Connected to Master from Replica ${port}`);
        ws.send(JSON.stringify({ type: "REGISTER", replica: port }));
    });

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === "COUNTDOWN") {
                console.log(`Replica ${port} Countdown: ${data.data} seconds`);
            }
        } catch (error) {
            console.error(`Error parsing message on Replica ${port}:`, error);
        }
    });

    ws.on("close", () => {
        console.error(`Connection to Master lost! Retrying in 5 seconds...`);
        setTimeout(connectToMaster, 5000);
    });

    ws.on("error", (err) => {
        console.error(`Replica ${port} WebSocket error:`, err.message);
    });
}

connectToMaster();
