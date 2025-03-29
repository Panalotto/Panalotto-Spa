export default function connectWebSocket(timeElement, numberBoxes, connectionCallback) {
    const browserPort = window.location.port;
    const WS_URL = `ws://localhost:${browserPort}`;
    
    if (window.ws && window.ws.readyState !== WebSocket.CLOSED) {
        console.log("⚠️ WebSocket already initialized.");
        return;
    }

    window.ws = new WebSocket(WS_URL);

    window.ws.onopen = () => {
        console.log("✅ WebSocket: Connected");
        timeElement.innerText = "Waiting for countdown...";
        if (typeof connectionCallback === 'function') {
            connectionCallback(true);
        }
    };

    window.ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            if (data.event === "countdownUpdate") {
                timeElement.innerText = `Next Draw: ${data.countdown} seconds`;
            } else if (data.event === "roundFinished") {
                timeElement.innerText = "Winning Result";

                let winningNumbers = data.result;
                
 
                if (typeof winningNumbers === "string") {
                    winningNumbers = winningNumbers.split(/[-\s]+/).map(num => parseInt(num, 10));
                }

                if (!Array.isArray(winningNumbers) || winningNumbers.some(isNaN)) {
                    console.error("❌ Invalid winning numbers format:", winningNumbers);
                    return;
                }

                console.log("🎉 Winning Numbers:", winningNumbers);

                numberBoxes.forEach((box, index) => {
                    box.textContent = winningNumbers[index] ?? "--";
                });

                if (winningNumbers.length !== numberBoxes.length) {
                    console.warn("⚠️ Mismatch in numbers count! Check WebSocket result format.");
                }
            }
        } catch (error) {
            console.error("❌ Error parsing WebSocket message:", error);
        }
    };

    window.ws.onerror = (error) => {
        console.error("⚠️ WebSocket Error:", error);
        timeElement.innerText = "Connection Error!";
        if (typeof connectionCallback === 'function') {
            connectionCallback(false);
        }
    };

    window.ws.onclose = () => {
        console.log("❌ WebSocket: Disconnected");
        timeElement.innerText = "Reconnecting...";

        if (typeof connectionCallback === 'function') {
            connectionCallback(false);
        }

        let reconnectDelay = Math.min(1000 * Math.pow(2, window.reconnectAttempts || 0), 30000);
        window.reconnectAttempts = (window.reconnectAttempts || 0) + 1;

        setTimeout(() => {
            console.log(`🔄 Attempting to reconnect in ${reconnectDelay / 1000}s...`);
            connectWebSocket(timeElement, numberBoxes, connectionCallback);
        }, reconnectDelay);
    };
}
