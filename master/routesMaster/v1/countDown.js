import { WebSocket } from "ws";

import CountdownController from "../../contollerMaster/v1/countdown.js";
import axios from "axios";

const countdown = new CountdownController();

export function setupWebSocket(wss, publisherPort = 9000) {
    wss.on("connection", (ws, req) => {
        const clientPort = new URL(req.url, `ws://${req.headers.host}`).port;

        console.log(`✅ New WebSocket Client Connected (Countdown) on port: ${clientPort}`);

        if (parseInt(clientPort) === publisherPort) {
           
            countdown.handleWebSocketConnection(ws);

            if (!countdown.listenerCount("countdownFinished")) {
                countdown.on("countdownFinished", async () => {
                    console.log(`[FINAL RESULT] Winning Numbers: ${countdown.winningNumbers}`);

                    

                    try {
                        const response = await axios.get("http://localhost:3000/v1/winner/get-winner", {
                            headers: { apikey: "panalotto" },
                        });
                        console.log("✅ Get winner", response.data);
                    } catch (error) {
                        console.error("❌ Error fetching winner:", error.message);
                    } 


                    const result = countdown.winningNumbers;

                    const data = JSON.stringify({ event: "roundFinished", result });

                    countdown.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            try {
                                client.send(data);
                            } catch (error) {
                                console.error("❌ Error sending WebSocket message:", error.message);
                            }
                        }
                    });

                    countdown.startCountdown();
                });
            }
        } else {
            // For other clients (e.g., port 9001), just send countdown updates.
            countdown.handleWebSocketConnection(ws);
        }
    });

    countdown.startCountdown();
}