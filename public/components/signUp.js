export default function CreateAccount(root){
    root.innerHTML = `
    <div class="custom-body">
        <div id="header-container">
            <h1 id="headtext">PANALOTTO</h1>
        </div>
        <div class="sign-up-container">
            <div class="register-card">
                <h1>Register</h1>
                <form class="form-register">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Enter email" required>
                    </div>
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Enter username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password">Confirm password</label>
                        <input type="password" id="confirm-password" placeholder="Enter password" required>
                    </div>
                    <button type="submit" class="signup-btn">Signup</button>
                    <div class="login-link">
                    <span class="login-link">Already have an account? <a href="/signIn">Log-In</a></span>
                    </div>
                </form>
            </div>
            <div class="signUpbg-container">
            <img id="imgsignup" src="./icons/signUpbg.png" alt="signupbg">
            </div>
        </div>
    </div>
    `;

}
