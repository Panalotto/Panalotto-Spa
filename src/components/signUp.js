import axios from 'axios';
import '../styles/signIn.css'

export default function CreateAccount(root){
    root.innerHTML = `
    <img id="cards" src="./icons/cards.png">
    <div class="container">
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
                <button data-path=/signIn id="back-btn">Back</button>
            </form>
        </div>
    </div>   
    `;

    const signUp = document.getElementById('signup');
    const popupOverlay = document.getElementById('popupOverlay');
    const errorMessage = document.getElementById('errorMessage');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');

    signUp.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target)

      usernameError.style.display = 'none';
      emailError.style.display = 'none';
      errorMessage.style.display = 'none';

      axios.post(`http://localhost:3000/v1/account`, formData, {
        headers: {
          apikey: `jenather`,
        }
      })
      .then((response) => {
        if (response.data.success === true){
          popupOverlay.style.display = 'block';
        }
        const message = response.data.message;
        if (message === 'username'){
          usernameError.textContent = 'Username already exist';
          usernameError.style.display = 'block';
        } else if (message === 'email'){
          emailError.textContent = "Email already exist";
          emailError.style.display = 'block';
        }
      })
      .catch((error) => {
        console.error('<error>', error)
      })
    })
}