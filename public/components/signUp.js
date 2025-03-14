<<<<<<< HEAD
import axios from 'axios';
import '../styles/signup.css'
import '../styles/common.css'

export default function CreateAccount(root){
    root.innerHTML = `
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
                <span class="login-link">Already have an account? <a href="/signIn">Register</a></span>
                </div>
            </form>
          </div>
        <div class="signUpbg-container">
          <img src="./icons/signUpbg.png" alt="signupbg">
        </div>
    </div>

=======
// import axios from 'axios';
// import '../styles/signup.css'

export default function CreateAccount(root){
    root.innerHTML = `
    <h1 id="headtextsignup">PANALOTTO</h1>
    <img id="cards" src="./icons/cards.png">
    <div class="container">
        <div class="register-card">
          <h1>Register</h1>
          <form id="form-register">
              <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Enter email" required>
              </div>
              <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" id="username" name="username" placeholder="Enter username" required>
              </div>
              <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" name="password" placeholder="Enter password" required>
              </div>
              <div class="form-group">
                  <label for="confirm-password">Confirm password</label>
                  <input type="password" id="confirm-password" name="confirmPassword" placeholder="Enter password" required>
              </div>
              <div class="button-container">
                  <button type="submit" id="signup-button">Signup</button>
                  <button type="button" data-path="/signIn" id="back-button">Back</button>
              </div>
          </form>
          <p id="errorMessage" style="color: red; display: none;"></p>
      </div>
    </div>   
>>>>>>> f536cab82f57622f7d8c56832aa5688989c1fce4
    `;

}
