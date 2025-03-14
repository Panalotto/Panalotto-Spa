import WebSocket from "ws";
import EventEmitter from "events";

class CountdownController extends EventEmitter {
    constructor() {
        super();
        this.countdown = 60; 
        this.interval = null;
        this.clients = new Set(); 
    }

    startCountdown() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.countdown = 60; // Reset countdown
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
    generateLottoResult() {
        const numbers = new Set(); 
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b).join(", ");
    }
    

    
}

export default CountdownController;
