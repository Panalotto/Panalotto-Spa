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
        console.log(`[FINAL RESULT] Winning Numbers: ${countdown.winningNumbers}`);

        //http://localhost:3000/v1/winner/winner-ka

        try {
            const response = await axios.get("http://localhost:3000/v1/winner/winner-ka", {
                headers: { apikey: "panalotto" }
            });
            console.log("Winner:", response.data);
            console.log("Winner ka:", response.data.data.bets);

        } catch (error) {
            console.error("Error inserting lotto result:", error.message);
        }



        try {
            const response = await axios.get("http://localhost:3000/v1/winner/get-win", {
                headers: { apikey: "panalotto" }
            });
            console.log("aLL BETS inserted:", response.data);
            console.log("Bets Data:", response.data.data.bets);

        } catch (error) {
            console.error("Error inserting lotto result:", error.message);
        }


        const result = countdown.winningNumbers; 




        console.log(result);

        // http://localhost:3000/v1/latest-drawId

    
        const winning_numbers = result;
        const payload = {winning_numbers };


        try {
            const response = await axios.post("http://localhost:3000/v1/result", payload, {
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
