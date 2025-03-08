import '../styles/mainpage.css';

export default function mainpage(root) {
    root.innerHTML = `
    <div class="panalotto-container">
        <header>
            <h1 id="panalotto-title" class="title-text">PANALOTTO</h1>
            
            <div id="draw-timer-box" class="draw-timer-box">
                <span class="draw-timer-text">Next Draw: <span id="countdown-timer">60 seconds</span></span>
            </div>
        </header>
        
        <div id="number-input-section" class="number-input-section">
            <p class="number-input-label">Enter number</p>
            <div id="number-boxes" class="number-boxes">
                <div class="number-box"></div>
                <div class="number-box"></div>
                <div class="number-box"></div>
                <div class="number-box"></div>
                <div class="number-box"></div>
            </div>
            <div class="action-buttons">
                <button id="enter-button" class="btn-action">Enter</button>
                <button id="reset-button" class="btn-action">Reset</button>
            </div>
        </div>

        <div id="bet-section" class="bet-section">
            <div id="bet-input-box" class="bet-input-box">
                <label for="bet-amount">Bet</label>
                <input type="text" id="bet-amount">
            </div>
            <div id="balance-box" class="balance-box">
                <label for="balance-amount">Balance</label>
                <input type="text" id="balance-amount">
            </div>
            <div id="prize-box" class="prize-box">
                <span class="prize-text">Prize</span>
                <img id="prize-image" src="../assets/coin.png" alt="Coin">
            </div>
        </div>
    </div>
    `;
}
