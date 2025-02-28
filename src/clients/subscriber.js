const socket = new WebSocket("ws://localhost:3001");

socket.onopen = () => {
    console.log("✅ Subscriber connected to WebSocket Server");
};

socket.onmessage = (event) => {
    console.log("📩 New broadcast:", event.data);
};
