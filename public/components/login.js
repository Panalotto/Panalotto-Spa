<<<<<<< HEAD
import axios from 'axios';
import '../styles/loginPage.css'
import '../styles/common.css'


=======
// import axios from 'axios';
// import '../styles/loginPage.css';
import connectWebSocket from './connectWeb/connectCountdown.js';
>>>>>>> f536cab82f57622f7d8c56832aa5688989c1fce4

export default function LogIn(root) {
    root.innerHTML = `
        <div class="custom-body">
            <div id="header-container">
                <h1 id="headtext">PANALOTTO</h1>
            </div>

<<<<<<< HEAD
    <div id="sign-container">
        <div id="lastdraw-container">
            <div class="countdown-title"> Next Draw: <span id="time"> Connecting...</div>
            <div class="timer-circles">
                <div class="lastdraw-circle" id="circle1"></div>
                <div class="lastdraw-circle" id="circle2"></div>
                <div class="lastdraw-circle" id="circle3"></div>
                <div class="lastdraw-circle" id="circle4"></div>
                <div class="lastdraw-circle" id="circle5"></div>
                <div class="lastdraw-circle" id="circle6"></div>
            </div>
            <div class="prize-container">$ 50000</div>
        </div>
        <div id="loginPage">
            <form enctype="multipart/form-data" id="signin">
                <h2 id="logintext">Login</h2>
                <label for="username"><b>Username</b></label>
                <input type="text" name="username" placeholder="Enter Username" required>

                <label for="password"><b>Password</b></label>
                <input type="password" name="password" placeholder="Enter Password" required>
                <span id="errorMessage" class="error-message"></span>
=======
<<<<<<< HEAD
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
=======
    <div class="ball-container">
        <div id="time">Maintenance</div>

        <div id="draw-numbers">
            ${Array(6).fill('<div class="number-box">--</div>').join('')}
        </div>
    </div>
    
    <div class="prize-box">
        <span class="dollar-icon">$ 50000</span>
    </div>

    <div id="loginPage">
        <form enctype="multipart/form-data" id="signin">
            <h2 id="logintext">Login</h2>
            <label for="username"><b>Username</b></label>
            <input type="text" id="username" name="username" placeholder="Enter Username" required>

            <label for="password"><b>Password</b></label>
            <input type="password" id="password" name="password" placeholder="Enter Password" required>
            <span id="errorMessage" class="error-message"></span>
>>>>>>> f536cab82f57622f7d8c56832aa5688989c1fce4

                <button type="submit">Login</button>
                <span class="crtAcct">Don't have an account? <a href="/signup">Register</a></span>
            </form>
        </div>
    </div>
>>>>>>> 497f4356344118b8f0f7944dd8d35eb47cb54292
    `;

    // 🎯 WebSocket Countdown & Number Updates
    const timeElement = document.getElementById('time');
    const numberBoxes = document.querySelectorAll(".number-box");

    connectWebSocket(timeElement, numberBoxes);

    // 🔥 Login Form Handling
    const errorMessage = document.getElementById('errorMessage');
    const signIn = document.getElementById('signin');

    signIn.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.style.display = 'none';

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData);

        try {
            const response = await fetch("http://localhost:3000/v1/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "apikey": "panalotto"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

            const result = await response.json();

            if (result.success) {
                localStorage.setItem("token", result.data.token);
                
                // ✅ SPA Navigation Fix
                window.location.assign('/mainpage');
            } else {
                errorMessage.textContent = result.message || "Invalid credentials.";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("Login Error:", error);
            errorMessage.textContent = "Network error. Please check your connection.";
            errorMessage.style.display = "block";
        }
    });
}
