import '../styles/mainpage.css';

export default function mainpage(root) {
    root.innerHTML = `
    <div class="containermainpage">
        <div class="draw-section">
            <div class="draw-title">Next Draw: <span id="countdown">60</span> seconds</div>
            <div class="draw-boxes">
                <div class="draw-box"></div>
                <div class="draw-box"></div>
                <div class="draw-box"></div>
                <div class="draw-box"></div>
                <div class="draw-box"></div>
                <div class="draw-box"></div>
            </div>
        </div>

        <div class="input-section">
            <div class="input-title">Enter number</div>
            <div class="input-boxes">
                <div class="input-box"></div>
                <div class="input-box"></div>
                <div class="input-box"></div>
                <div class="input-box"></div>
                <div class="input-box"></div>
                <div class="input-box"></div>
            </div>
            
            <div class="buttons">
                <button class="btn enter-btn">Enter</button>
                <button class="btn reset-btn">Reset</button>
            </div>
            
            <div class="info-section">
                <div class="info-left">
                    <div class="info-box bet-box">
                        <div class="info-label">Bet</div>
                    </div>
                    <div class="info-box balance-box">
                        <div class="info-label">Balance</div>
                    </div>
                </div>
                <div class="info-right">
                    <div class="info-box prize-box">
                        <div class="info-label">Prize</div>
                        <div class="coin">
                            <img src="https://cdn-icons-png.flaticon.com/512/217/217853.png" alt="Coin">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
