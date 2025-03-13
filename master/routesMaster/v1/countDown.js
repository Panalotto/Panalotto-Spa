import { WebSocketServer, WebSocket } from "ws";
import axios from "axios";
import CountdownController from "../../contollerMaster/v1/countdown.js";

const countdown = new CountdownController();

export function setupWebSocket(server) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        countdown.handleWebSocketConnection(ws);
    });

    countdown.on("countdownFinished",async () => {
        const result = countdown.generateLottoResult(); 

        console.log(result);

        // http://localhost:3000/v1/latest-drawId

        const previous = await axios.get("http:localhost:3000/v1/latest-drawId");

        const draw_id = previous + 1 || 1; 
        const draw_time = new Date().toISOString().slice(0, 19).replace("T", " "); 
        const winning_numbers = result;
        const payload = { draw_id, draw_time, winning_numbers };

        try {
            const response = await axios.post("http://localhost:3000/v1/draw", payload, {
                headers: { apikey: "panalotto" }
            });
            console.log("Lotto result inserted:", response.data);
        } catch (error) {
            console.error("Error inserting lotto result:", error.message);
        }


        const data = JSON.stringify({ event: "roundFinished", result });

        // http://localhost:3000/v1/draw

        

        

        

        
        countdown.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) { 
                client.send(data);
            }
        });

        countdown.startCountdown(); 
    });

    countdown.startCountdown(); 
}
