import http from "http";
import express from "express";
// import { WebSocketServer } from "ws";
import path from "path";
import { setupWebSocket } from "./routesMaster/v1/countDown.js";

const publicPath = "c:/Users/levs0/OneDrive/Desktop/PortableGit/Panalotto-Spa/Public";




const port = 9000;

const app = express();
const server = http.createServer(app);
setupWebSocket(server);

server.listen(port, () => console.log(`Master Server Started at Port: ${port}`));

console.log("Serving index.html from:", path.join(publicPath, "index.html"));

app.use(express.static(publicPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// const wss = new WebSocketServer({ server });
// const replicas = new Set(); // Para sa listahan ng replicas

// let timeLeft = 60; // Start ng countdown

// function startCountdown() {
//     const countdownInterval = setInterval(() => {
//         if (timeLeft > 0) {
//             const message = JSON.stringify({ type: "COUNTDOWN", data: timeLeft });

//             // Broadcast sa lahat ng connected clients
//             wss.clients.forEach((client) => {
//                 if (client.readyState === client.OPEN) {
//                     client.send(message);
//                 }
//             });

//             timeLeft--;
//         } else {
//             clearInterval(countdownInterval); // Stop current countdown
//             console.log("🎯 Countdown finished. Restarting in 3 seconds...");

//             // Maghintay ng 3 segundo bago mag-restart
//             setTimeout(() => {
//                 timeLeft = 60; // Reset to 60 seconds
//                 startCountdown(); // Loop ulit
//             }, 3000);
//         }
//     }, 1000);
// }

// // Simulan ang countdown kapag may unang client na nag-connect
// wss.on("connection", (ws) => {
//     console.log("Client connected.");

//     if (wss.clients.size === 1) {
//         startCountdown(); // Start the countdown loop only once
//     }
// });


// wss.on("connection", (ws) => {
//     console.log(`Client connected to Master at port ${port}`);

//     ws.on("message", (message) => {
//         try {
//             const data = JSON.parse(message);

//             if (data.type === "REGISTER") {
//                 console.log(`Replica ${data.replica} registered.`);
//                 replicas.add(ws); // I-save ang connection ng replica
//             }
//         } catch (error) {
//             console.error("Error processing message:", error);
//         }
//     });

//     // Ipadala agad ang kasalukuyang countdown timer sa bagong client
//     ws.send(JSON.stringify({ type: "COUNTDOWN", data: timeLeft }));
// });
