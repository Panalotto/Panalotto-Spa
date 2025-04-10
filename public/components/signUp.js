export default function CreateAccount(root) {
    root.innerHTML = `
    <div class="custom-body">
        <div id="header-container">
            <h1 id="headtext">PANALOTTO</h1>
        </div>
        <div class="sign-up-container">
            <div class="register-card">
                <h1>Register</h1>
                <form class="form-register" enctype="multipart/form-data" id="signup">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter email" required>
                        <span id="emailError" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter username" required>
                        <span id="usernameError" class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirm password</label>
                        <input type="password" id="confirm-password" placeholder="Enter password" required>
                        <span id="passwordError" class="error-message"></span>
                    </div>
                    <button type="submit" class="signup-btn">Signup</button>
                    <div class="login-link">
                        <span>Already have an account? <a href="#" id="pasok">Log-In</a></span>
                    </div>
                </form>
            </div>
            <div class="signUpbg-container">
                <img id="imgsignup" src="./icons/signUpbg.png" alt="signupbg">
            </div>
        </div>
    </div>

    <div class="message-popup-overlay" id="popupOverlay" style="display: none;">
        <div class="popup" id="popup">
            <span class="close" id="closePopup">&times;</span>
            <div class="popup-content">
                <p>Thanks for creating an account!</p>
                <h3>Welcome to PANALOTTO</h3>
                <button id="continueBtn">Continue</button>
            </div>
        </div>
    </div>
    `;

    document.getElementById("pasok").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default <a> tag behavior
        window.location.href = "/signIn";
    });  

    document.getElementById("continueBtn").addEventListener("click", () => {
        window.location.href = "/signIn";
    });

    // Get Elements
    const signUp = document.getElementById('signup');
    const popupOverlay = document.getElementById('popupOverlay');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const continueBtn = document.getElementById('continueBtn');

    signUp.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get Form Data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Reset Error Messages
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';

        // Password Validation
        if (data.password !== document.getElementById('confirm-password').value) {
            passwordError.textContent = "Passwords do not match";
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/v1/account", data, {
                headers: {
                    "Content-Type": "application/json",
                    "apikey": "panalotto",
                }
            });

            if (response.data.success) {
                popupOverlay.style.display = 'flex';
            } else {
                const message = response.data.message;
                if (message === 'username') {
                    usernameError.textContent = 'Username already exists';
                } else if (message === 'email') {
                    emailError.textContent = "Email already exists";
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }

          
    });

    
}
