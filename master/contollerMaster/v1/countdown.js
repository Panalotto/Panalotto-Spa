import WebSocket from "ws";
import EventEmitter from "events";
import axios from "axios";
class CountdownController extends EventEmitter {
    constructor() {
        super();
        this.countdown = 60; 
        this.interval = null;
        this.clients = new Set(); 
        this.winningNumbers = null; 
        
    }

    startCountdown() {
        
        if (this.interval) {
            clearInterval(this.interval);
        }



        this.countdown = 60; // Reset countdown
        this.winningNumbers = this.generateLottoResult();
        console.log(`[TEST MODE] New Winning Numbers: ${this.winningNumbers}`);


        this.saveLottoResultToDatabase(this.winningNumbers);


        this.interval = setInterval(() => {
            if (this.countdown <= 0) {
                clearInterval(this.interval);
                this.emit("countdownFinished");
                return;
            }

            this.countdown--;
            this.broadcastCountdown();
        }, 1000);
    }

    broadcastCountdown() {
        const data = JSON.stringify({ event: "countdownUpdate", countdown: this.countdown });
        this.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    }

    handleWebSocketConnection(ws) {
        this.clients.add(ws);
        console.log("New WebSocket connection");

        ws.send(JSON.stringify({ event: "countdownUpdate", countdown: this.countdown }));

        ws.on("close", () => {
            this.clients.delete(ws);
            console.log("Client disconnected");
        });
    }

    // sample output xx-xx-xx-xx-xx-xx
    generateLottoResult() {
        const numbers = new Set(); 
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).join("-");
    }


    async saveLottoResultToDatabase(result) {
        const payload = { winning_numbers: result };
    
        try {
            const response = await axios.post("http://localhost:3000/v1/result", payload, {
                headers: { apikey: "panalotto" },
            });
            console.log("✅ Lotto result inserted immediately:", response.data);
        } catch (error) {
            console.error("❌ Error inserting lotto result immediately:", error.message);
        }
    }
    

    
}

export default CountdownController;
