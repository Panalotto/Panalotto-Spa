export default function connectWebSocket(timeElement, numberBoxes) {
    const WS_URL = "ws://localhost:9000";
    let socket = new WebSocket(WS_URL);

    socket.onopen = () => {
        console.log("✅ WebSocket Connected!");
        timeElement.innerText = "Waiting for countdown...";
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            // console.log("🟢 WebSocket Data Received:", data);

            if (data.event === "countdownUpdate") {
                timeElement.innerText = `Time left: ${data.countdown} seconds`;
            } else if (data.event === "roundFinished") {
                timeElement.innerText = "Round Finished! Updating numbers...";

                let winningNumbers = data.result;
                if (typeof winningNumbers === "string") {
                    winningNumbers = winningNumbers.split(/,\s*/).map(num => parseInt(num, 10));
                }

                




                if (!Array.isArray(winningNumbers)) {
                    console.error("Invalid winning numbers format:", winningNumbers);
                    return;
                }

                console.log("🎉 Winning Numbers:", winningNumbers);

                numberBoxes.forEach((box, index) => {
                    box.textContent = winningNumbers[index] ?? "--";
                });

                if (winningNumbers.length !== numberBoxes.length) {
                    console.warn("Mismatch in numbers count! Check WebSocket result format.");
                }
            }
        } catch (error) {
            console.error("❌ Error parsing WebSocket message:", error);
        }
    };

    socket.onerror = (error) => {
        console.error("⚠️ WebSocket Error:", error);
        timeElement.innerText = "Connection Error!";
    };

    socket.onclose = () => {
        console.log("🔄 WebSocket Disconnected! Reconnecting in 3s...");
        timeElement.innerText = "Reconnecting...";
        
        // ✅ FIXED: Pass timeElement and numberBoxes when reconnecting
        setTimeout(() => connectWebSocket(timeElement, numberBoxes), 3000);
    };
}