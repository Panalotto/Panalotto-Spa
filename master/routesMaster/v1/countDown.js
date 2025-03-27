import { WebSocket } from "ws";
import axios from "axios";
import CountdownController from "../../contollerMaster/v1/countdown.js";

const countdown = new CountdownController();

export function setupWebSocket(wss) {
    wss.on("connection", (ws) => {
        console.log("✅ New WebSocket Client Connected (Countdown)");
        countdown.handleWebSocketConnection(ws);
    });

    if (!countdown.listenerCount("countdownFinished")) {
        countdown.on("countdownFinished", async () => {
            console.log(`[FINAL RESULT] Winning Numbers: ${countdown.winningNumbers}`);

            try {
                const response = await axios.get("http://localhost:3000/v1/winner/get-win", {
                    headers: { apikey: "panalotto" }
                });
                console.log("✅ ALL BETS inserted:", response.data);
            } catch (error) {
                console.error("❌ Error inserting lotto result:", error.message);
            }

            const result = countdown.winningNumbers; 
            const payload = { winning_numbers: result };

            try {
                const response = await axios.post("http://localhost:3000/v1/result", payload, {
                    headers: { apikey: "panalotto" }
                });
                console.log("✅ Lotto result inserted:", response.data);
            } catch (error) {
                console.error("❌ Error inserting lotto result:", error.message);
            }

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

    countdown.startCountdown(); 
}
