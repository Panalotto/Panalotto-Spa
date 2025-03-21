export default function profile(root) {
    console.log('Rendering ProfileContents...');

    axios.get('http://localhost:3000/v1/account', {
        headers: {
            apikey: 'panalotto',
            token: localStorage.getItem('token'),
        }
    })
    .then((response) => {
        if (response.data.success === true) {
            const data = response.data.data;
            root.innerHTML = `
                    <div id="header-container">
        <h1 id="headtext">PANALOTTO</h1>
    </div>
    <div class="profile-container">
        <div class="game-box">
            <img src="https://res.cloudinary.com/dpjhzyge9/image/upload/v1741359300/f060bf1358d82e7e0adc287c46915bc6_xyiufz.jpg" alt="Cash Back Promotion">
            <a href="/mainpage"><button class="play-btn">Play</button></a>
        </div>
        
        <div class="profile-card">
            <div class="avatar">👤</div>
            <div class="info">
            <h3>${data.username}</h3>
            <p>${data.email}</p>
            </div>

        </div>
    
    
        <div class="wallet-info">
           <h4>Virtual Wallet</h4>
            <p>₱: ${data.balance}</p>
        </div>
        <div class="wallet-actions">
            <button class="cashin" id="cashinBtn">Cash in</button>
            <button class="cashout" id="cashoutBtn">Cash out</button>
        </div>
        
    </div> 
    <div class="logoutBtn">
        <button id="logout-btn">Logout</button>
    </div>



  
        

    <div class="overlay" id="cashinOverlay">
        <div class="popup">
            <div class="popup-header">
                <div class="popup-title">Cash In</div>
                <button class="close-btn" id="closeCashinBtn">&times;</button>
            </div>
            <div class="popup-content">
                <form class="popup-form" enctype="multipart/form-data" id="cashinForm">
                    <div class="formgroup">
                        <label for="username">Username</label>

                        <input type="text" id="username" value="${data.username}" readonly>                    
                        <label for="amount">Amount</label>
                        <input type="number" id="cashinAmount" placeholder="Enter amount" min="1">
                    </div>
                    <button type="submit" class="submit-btn">Confirm Cash In</button>
                </form>
            </div>
        </div>
    </div>

    <div class="overlay" id="cashoutOverlay">
        <div class="tocenter">
            <div class="popup">
            <div class="popup-header">
                <div class="popup-title">Cash Out</div>
                <button class="close-btn" id="closeCashoutBtn">&times;</button>
            </div>
            <div class="popup-content">
                <form class="popup-form" enctype="multipart/form-data" id="cashoutForm">
                    <div class="formgroup">
                        <label for="username">Username</label>

                        <input type="text" id="username" value="${data.username}" readonly>  
                        <label for="withdrawAmount">Amount</label>
                        <input type="number" id="cashoutAmount" placeholder="Enter amount" min="1" max="5000">
                    </div>
                    <button type="submit" class="submit-btn">Confirm Cash Out</button>
                </form>
            </div>
        </div>
        </div>
    </div>

            `;

            // Event listeners for modals
            document.getElementById("cashinBtn").addEventListener("click", () => {
                document.getElementById("cashinOverlay").style.display = "block";
            });

            document.getElementById("closeCashinBtn").addEventListener("click", () => {
                document.getElementById("cashinOverlay").style.display = "none";
            });

            document.getElementById("cashoutBtn").addEventListener("click", () => {
                document.getElementById("cashoutOverlay").style.display = "block";
            });
            
            document.getElementById("closeCashoutBtn").addEventListener("click", () => {
                document.getElementById("cashoutOverlay").style.display = "none";
            });

            // Logout Functionality
            document.getElementById("logout-btn").addEventListener("click", () => {
                console.log("Logout button clicked");
            
                // Remove token & user_id from localStorage
                localStorage.removeItem("token");
                localStorage.removeItem("user_id");
            
                console.log("Token and User ID removed");
            
                // Redirect to login page
                window.location.href = "/signIn";
            
                // Prevent going back
                setTimeout(() => {
                    window.history.pushState(null, "", "/signIn");
                }, 500);
            });
            
            

            

            // Cash In form submission
            const cashinForm = document.getElementById('cashinForm');
            // const errorMessage = document.getElementById('errorMessage');

            cashinForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                // errorMessage.style.display = 'none';

                const amount = document.getElementById("cashinAmount").value;
                const payload = { username: data.username, amount };

                try {
                    const response = await fetch("http://localhost:3000/v1/account/cashIn", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "apikey": "panalotto",
                            "token": localStorage.getItem('token')
                        },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

                    const result = await response.json();

                    if (result.success) {
                        window.location.assign('/profile');
                        document.getElementById("cashinOverlay").style.display = "none";
                    } else {
                        errorMessage.textContent = result.message || "Transaction failed.";
                        errorMessage.style.display = "block";
                    }
                } catch (error) {
                    console.error("Cash In Error:", error);
                    errorMessage.textContent = "Network error. Please check your connection.";
                    errorMessage.style.display = "block";
                }
            });

            const cashoutForm = document.getElementById('cashoutForm');
            const cashoutErrorMessage = document.createElement("p"); 
            cashoutErrorMessage.classList.add("error-message");
            cashoutErrorMessage.style.display = "none";
            cashoutForm.appendChild(cashoutErrorMessage); 

            cashoutForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                cashoutErrorMessage.style.display = 'none';

                const amount = document.getElementById("cashoutAmount").value;
                const payload = { username: data.username, amount };

                try {
                    const response = await fetch("http://localhost:3000/v1/account/cashOut", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "apikey": "panalotto",
                            "token": localStorage.getItem('token')
                        },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

                    const result = await response.json();

                    if (result.success) {
                        window.location.assign('/profile');
                        document.getElementById("cashOutOverlay").style.display = "none";
                    } else {
                        cashoutErrorMessage.textContent = result.message || "Transaction failed.";
                        cashoutErrorMessage.style.display = "block";
                    }
                } catch (error) {
                    console.error("Cash Out Error:", error);
                    cashoutErrorMessage.textContent = "Network error. Please check your connection.";
                    cashoutErrorMessage.style.display = "block";
                }
            });

        } else {
            root.innerHTML = "<p>Error loading profile.</p>";
        }
    })
    .catch(error => {
        console.error("API Error:", error);
        root.innerHTML = "<p>Failed to load profile.</p>";
    });
}




