// import axios from 'axios';
// import '../styles/loginPage.css';

export default function LogIn(root) {
    root.innerHTML = `
    <div id="header-container">
        <h1 id="headtext">PANALOTTO</h1>
    </div>

    <img id="icon" src="./icons/icon.png">
    
    <div id="loginPage">
        <form enctype="multipart/form-data" id="signin">
        <h2 id="logintext">Login</h2>
            <label for="username"><b>Username</b></label>
            <input type="text" name="username" placeholder="Enter Username" required>

            <label for="password"><b>Password</b></label>
            <input type="password" name="password" placeholder="Enter Password" required>
            <span id="errorMessage"></span>

            <button type="submit">Login</button>
            <span class="crtAcct">Don't have an account? <a href="/signup">Register</a></span>
        </form>
    </div>

    `;

    // ⏳ Countdown Timer Update (WebSocket)
    const timeElement = document.getElementById('time');
    const socket = new WebSocket('ws://localhost:9000'); // Connect WebSocket

    socket.onmessage = (event) => {
        timeElement.innerText = `Time left: ${event.data} seconds`;
    };

    socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
    };

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
            errorMessage.textContent = "Server error. Please try again.";
            errorMessage.style.display = 'block';
        }
    });
}
