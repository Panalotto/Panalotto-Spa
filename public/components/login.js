import axios from 'axios';
import '../styles/loginPage.css';

export default function LogIn(root) {
    root.innerHTML = `
        <div class="custom-body">
            <div id="header-container">
                <h1 id="headtext">PANALOTTO</h1>
            </div>

            <div class="ball-container">
                <div id="time">Next Draw: 60 seconds</div>
                <div id="draw-numbers">
                    <div class="number-box">10</div>
                    <div class="number-box">10</div>
                    <div class="number-box">10</div>
                    <div class="number-box">10</div>
                    <div class="number-box">10</div>
                    <div class="number-box">10</div>
                </div>
            </div>
            
            <div id="prize-box">
                <span id="dollar-icon">$ 5000</span>
            </div>

            <div id="loginPage">
                <form enctype="multipart/form-data" id="signin">
                    <h2 id="logintext">Login</h2>
                    <label for="username"><b>Username</b></label>
                    <input type="text" name="username" placeholder="Enter Username" required>

                    <label for="password"><b>Password</b></label>
                    <input type="password" name="password" placeholder="Enter Password" required>
                    <span id="errorMessage" class="error-message"></span>

                    <button type="submit">Login</button>
                    <span class="crtAcct">Don't have an account? <a href="/signup">Register</a></span>
                </form>
            </div>
        </div>
    `;

    // 🎯 WebSocket Countdown Update
    const timeElement = document.getElementById('time');
    const WS_URL = "ws://localhost:9000";
    let socket = null;

    function connectWebSocket() {
        socket = new WebSocket(WS_URL);

        socket.onopen = () => {
            console.log("WebSocket Connected!");
            timeElement.innerText = "Waiting for countdown...";
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.event === "countdownUpdate") {
                    timeElement.innerText = `Time left: ${data.countdown} seconds`;
                } else if (data.event === "roundFinished") {
                    timeElement.innerText = `Round Finished! Winning Number: ${data.result}`;
                }
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
            timeElement.innerText = "Connection Error!";
        };

        socket.onclose = () => {
            console.log("WebSocket Disconnected! Reconnecting...");
            timeElement.innerText = "Reconnecting...";
            setTimeout(connectWebSocket, 3000);
        };
    }

    connectWebSocket(); // Initialize WebSocket Connection

    // 🔥 Login Form Handling
    const errorMessage = document.getElementById('errorMessage');
    const signIn = document.getElementById('signin');

    signIn.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.style.display = 'none';

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        try {
            const response = await axios.post(`http://localhost:3000/v1/account/login`, payload, {
                headers: { apikey: `panalotto` }
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                history.pushState({}, '', '/');
                window.dispatchEvent(new Event('popstate'));
            } else {
                errorMessage.textContent = response.data.message;
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error(error);
            errorMessage.textContent = error.response?.data?.message || "Server error. Please try again.";
            errorMessage.style.display = 'block';
        }
    });
}
