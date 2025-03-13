// import axios from 'axios';
// import '../styles/signup.css'

export default function CreateAccount(root){
    root.innerHTML = `
    <h1 id="headtextsignup">PANALOTTO</h1>
    <img id="cards" src="./icons/cards.png">
    <div class="container">
        <div class="register-card">
<<<<<<< HEAD
            <h1>Register</h1>
            <form class="form-register" enctype="multipart/form-data" id="signup">
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
                <div id="errorMessage" style="display:none; color:red;"></div>
                <button type="submit" class="signup-btn">Signup</button>
                <button type="button" id="back-btn">Back</button>
            </form>
        </div>
=======
          <h1>Register</h1>
          <form id="form-register">
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
              <div class="button-container">
                  <button type="submit" id="signup-button">Signup</button>
                  <button data-path="/signIn" id="back-button">Back</button>
              </div>
          </form>
      </div>
>>>>>>> ed7e279b126ee4ea21c5792ec5bbae39b3a4c98f
    </div>   
    `;

    const errorMessage = document.getElementById('errorMessage');
    const signUp = document.getElementById('signup');

    signUp.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.style.display = 'none';

        const formData = new FormData(signUp);
        const payload = {
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        if (payload.password !== payload.confirmPassword) {
            errorMessage.textContent = "Passwords do not match!";
            errorMessage.style.display = 'block';
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/v1/account/`, payload, {
                headers: { apikey: `panalotto` }
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                history.pushState({}, '', '/signIn');
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

    document.getElementById('back-btn').addEventListener('click', () => {
        history.pushState({}, '', '/signIn');
        window.dispatchEvent(new Event('popstate'));
    });
}
