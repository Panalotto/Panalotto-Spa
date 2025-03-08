import '../styles/profile.css';

export default function profile(root) {
    root.innerHTML = `
    <div class="container">
        <div class="game-box">
            <img src="https://res.cloudinary.com/dpjhzyge9/image/upload/v1741359300/f060bf1358d82e7e0adc287c46915bc6_xyiufz.jpg" alt="Cash Back Promotion">
            <a href="panalotto.html"><button class="play-btn">Play</button></a>
        </div>
        
        <div class="profile-card">
            <div class="avatar">👤</div>
            <h3>Genniesys Bracia</h3>
            <p>genniesysthermo@gmail.com</p>
        </div>
        
        <div class="wallet-row">
            <div class="wallet">
                <div class="wallet-info">
                    <h4>P-Wallet</h4>
                    <p>$ 5000</p>
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

    <div class="overlay" id="cashinOverlay">
        <div class="popup">
            <div class="popup-header">
                <div class="popup-title">Cash In</div>
                <button class="close-btn" id="closeCashinBtn">&times;</button>
            </div>
            <div class="popup-content">
                <form class="popup-form">
                    <div class="form-group">
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
                    <button type="button" class="submit-btn">Confirm Cash In</button>
                </form>
            </div>
        </div>
    </div>

    <div class="overlay" id="cashoutOverlay">
        <div class="popup">
            <div class="popup-header">
                <div class="popup-title">Cash Out</div>
                <button class="close-btn" id="closeCashoutBtn">&times;</button>
            </div>
            <div class="popup-content">
                <form class="popup-form">
                    <div class="form-group">
                        <label for="withdrawAmount">Amount</label>
                        <input type="number" id="withdrawAmount" placeholder="Enter amount" min="1" max="5000">
                    </div>
                    <div class="form-group">
                        <label for="withdrawMethod">Withdrawal Method</label>
                        <select id="withdrawMethod">
                            <option value="">Select withdrawal method</option>
                            <option value="bank">Bank Account</option>
                            <option value="card">Credit/Debit Card</option>
                            <option value="ewallet">E-Wallet</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="accountDetails">Account Details</label>
                        <input type="text" id="accountDetails" placeholder="Enter account details">
                    </div>
                    <button type="button" class="submit-btn">Confirm Cash Out</button>
                </form>
            </div>
        </div>
    </div>

    <div class="overlay" id="historyOverlay">
        <div class="popup">
            <div class="popup-header">
                <div class="popup-title">Draw History</div>
                <button class="close-btn" id="closeHistoryBtn">&times;</button>
            </div>
            <div class="popup-content">
                <div class="draw-history-columns">
                    <div class="draw-history-column">
                        <div class="column-title">Your Numbers</div>
                        
                        <div class="draw-entry">
                            <div class="draw-date">Mar 8, 2025</div>
                            <div class="draw-numbers">
                                <div class="number-ball"></div>
                                <div class="number-ball"></div>
                                <div class="number-ball">23</div>
                                <div class="number-ball">34</div>
                                <div class="number-ball">45</div>
                            </div>
                        </div>
                        
                        <div class="draw-entry">
                            <div class="draw-date">Mar 7, 2025</div>
                            <div class="draw-numbers">
                                <div class="number-ball">3</div>
                                <div class="number-ball">16</div>
                                <div class="number-ball">22</div>
                                <div class="number-ball">27</div>
                                <div class="number-ball">41</div>
                            </div>
                        </div>
                        
                        <div class="draw-entry">
                            <div class="draw-date">Mar 6, 2025</div>
                            <div class="draw-numbers">
                                <div class="number-ball">5</div>
                                <div class="number-ball">11</div>
                                <div class="number-ball">19</div>
                                <div class="number-ball">26</div>
                                <div class="number-ball">38</div>
                            </div>
                        </div>
                    </div>

                    <div class="draw-history-column">
                        <div class="column-title">Winning Numbers</div>
                        
                        <div class="draw-entry">
                            <div class="draw-date">Mar 8, 2025</div>
                            <div class="draw-numbers">
                                <div class="number-ball winner-ball">7</div>
                                <div class="number-ball winner-ball">15</div>
                                <div class="number-ball winner-ball">23</div>
                                <div class="number-ball winner-ball">31</div>
                                <div class="number-ball winner-ball">42</div>
                            </div>
                        </div>
                        
                        <div class="draw-entry">
                            <div class="draw-date">Mar 7, 2025</div>
                            <div class="draw-numbers">
                                <div class="number-ball winner-ball">3</div>
                                <div class="number-ball winner-ball">14</div>
                                <div class="number-ball winner-ball">25</div>
                                <div class="number-ball winner-ball">36</div>
                                <div class="number-ball winner-ball">47</div>
                            </div>
                        </div>
                        
                        <div class="draw-entry">
                            <div class="draw-date">Mar 6, 2025</div>
                            <div class="draw-numbers">
                                <div class="number-ball winner-ball">5</div>
                                <div class="number-ball winner-ball">18</div>
                                <div class="number-ball winner-ball">24</div>
                                <div class="number-ball winner-ball">33</div>
                                <div class="number-ball winner-ball">39</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}