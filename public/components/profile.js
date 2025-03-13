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
            <div class="main-container">
            <div class="container">
                <div class="game-box">
                    <img src="https://res.cloudinary.com/dpjhzyge9/image/upload/v1741359300/f060bf1358d82e7e0adc287c46915bc6_xyiufz.jpg" alt="Cash Back Promotion">
                    <button data-path="/mainpage" class="play-btn">Play</button>
                </div>
                
                <div class="profile-card">
                    <div class="avatar">👤</div>
                    <h3>${data.username}</h3>
                    <p>${data.email}</p>
                </div>
                
                <div class="wallet-row">
                    <div class="wallet">
                        <div class="wallet-info">
                            <h4>P-Wallet</h4>
                            <p>$ ${data.balance || 0}</p>  <!-- Updated balance display -->
                        </div>
                        <div class="wallet-actions">
                            <button class="cashin" id="cashinBtn">Cash in</button>
                            <button class="cashout" id="cashoutBtn">Cash out</button>
                        </div>
                    </div>

                    <div class="history" id="historyBtn">
                        <h4>Draw history</h4>
                    </div>
                </div>
            </div>

            <div class="overlay" id="cashinOverlay" style="display: none;">
                <div class="popup">
                    <div class="popup-header">
                        <div class="popup-title">Cash In</div>
                        <button class="close-btn" id="closeCashinBtn">&times;</button>
                    </div>
                    <div class="popup-content">
                        <form class="popup-form">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" value="${data.username}" readonly>

                                <label for="amount">Amount</label>
                                <input type="number" id="amount" placeholder="Enter amount" min="1">
                            </div>
                            <button type="button" class="submit-btn">Confirm Cash In</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>

            <div class="overlay" id="cashOutOverlay" style="display: none;">
                <div class="popup">
                    <div class="popup-header">
                        <div class="popup-title">Cash Out</div>
                        <button class="close-btn" id="closeCashoutBtn">&times;</button>
                    </div>
                    <div class="popup-content">
                        <form class="popup-form">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" value="${data.username}" readonly>

                                <label for="amount">Amount</label>
                                <input type="number" id="amount" placeholder="Enter amount" min="1">
                            </div>
                            <div class="form-group">
                                <label for="paymentMethod">Payment Method</label>
                                <select id="paymentMethod">
                                    <option value="">Select payment method</option>
                                    <option value="credit">Credit Card</option>
                                    <option value="debit">Debit Card</option>
                                    <option value="bank">Bank Transfer</option>
                                    <option value="ewallet">E-Wallet</option>
                                </select>
                            </div>
                            <button type="button" class="submit-btn">Confirm Cash Out</button>
                        </form>
                    </div>
                </div>
            </div>
            `;

            // Attach event listeners after DOM update
            requestAnimationFrame(() => {
                const cashinBtn = document.getElementById("cashinBtn");
                const cashinOverlay = document.getElementById("cashinOverlay");
                const closeCashinBtn = document.getElementById("closeCashinBtn");

                if (cashinBtn && cashinOverlay && closeCashinBtn) {
                    cashinBtn.addEventListener("click", () => {
                        cashinOverlay.style.display = "block";
                    });

                    closeCashinBtn.addEventListener("click", () => {
                        cashinOverlay.style.display = "none";
                    });

                    cashinOverlay.addEventListener("click", (e) => {
                        if (e.target === cashinOverlay) {
                            cashinOverlay.style.display = "none";
                        }
                    });
                }

                // Cashout event handlers
                const cashoutBtn = document.getElementById("cashoutBtn");
                const cashOutOverlay = document.getElementById("cashOutOverlay");
                const closeCashoutBtn = document.getElementById("closeCashoutBtn");

                if (cashoutBtn && cashOutOverlay && closeCashoutBtn) {
                    cashoutBtn.addEventListener("click", () => {
                        cashOutOverlay.style.display = "block";
                    });

                    closeCashoutBtn.addEventListener("click", () => {
                        cashOutOverlay.style.display = "none";
                    });

                    cashOutOverlay.addEventListener("click", (e) => {
                        if (e.target === cashOutOverlay) {
                            cashOutOverlay.style.display = "none";
                        }
                    });
                }
            });
        }
    })
    .catch((error) => {
        console.error("Error fetching account data:", error);
    });
}
