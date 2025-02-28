const socket = new WebSocket("ws://localhost:3001");

socket.onopen = () => {
    console.log("✅ Publisher connected to WebSocket Server");
    socket.send("Hello from Publisher!");
};

socket.onmessage = (event) => {
    console.log("📩 Received:", event.data);
};
