export default function connectDelayInsert() {
    const WS_URL = "ws://localhost:9000";
    let socket = new WebSocket(WS_URL);

    socket.onopen = () => {
        console.log("✅ WebSocket Connected!");
    };

    socket.onerror = (error) => {
        console.error("⚠️ WebSocket Error:", error);
    };

    socket.onclose = () => {
        console.log("🔄 WebSocket Disconnected! Reconnecting in 3s...");
        setTimeout(() => connectDelayInsert(), 3000);
    };

    socket.onmessage = (event) => {
        try {
            const message = JSON.parse(event.data);
            console.log("📩 WebSocket message received:", message);

            if (message.event === "betConfirmed") {
                alert("✅ Bet successfully recorded!");
            }

            if (message.event === "roundFinished") {
                alert(`🎉 Winning Numbers: ${message.result}`);
                window.location.reload(); // Refresh main page to show results
            }
        } catch (error) {
            console.error("❌ Error parsing WebSocket message:", error);
        }
    };

    // Attach the WebSocket to the window so we can reuse it elsewhere
    window.delaySocket = socket;
}
