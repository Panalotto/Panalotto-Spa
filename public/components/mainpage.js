// import '../styles/mainpage.css';
import connectWebSocket from './connectWeb/connectCountdown.js';

export default function mainpage(root) {
    root.innerHTML = `
    <div class="containermainpage">

        <div class="group-bar">
            <h1 id="headtext">PANALOTTO</h1>
            <div class="avatar"><img src="../icons/image 3.png"></div>


        </div>
        <div class="draw-section">
            <div class="draw-title">Next Draw: <span id="time">60</span> seconds</div>
            <div class="draw-boxes">
                ${Array(6).fill('<div class="draw-box">--</div>').join('')}
            </div>
        </div>

        <div class="input-section">
            <div class="input-title">Enter number</div>
            <div class="input-boxes">
                ${Array(6).fill('<input type="text" class="input-box" maxlength="2" pattern="[0-9]{1,2}">').join('')}
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

    // 🎯 WebSocket Countdown & Number Updates
    const timeElement = document.getElementById('time');
    const numberBoxes = document.querySelectorAll(".draw-box");

    
    connectWebSocket(timeElement, numberBoxes);

    


    
    

    // 🎯 Input Handling: Allow only 1-45 & No Duplicates
    const inputBoxes = document.querySelectorAll(".input-box");

inputBoxes.forEach((box, index) => {
    box.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, ''); // 🔹 Remove non-numeric characters

        if (value !== "") {
            let num = parseInt(value, 10);
            if (num < 1) num = 1;
            if (num > 45) num = 45;

            // 🔹 Check for duplicates
            let existingNumbers = Array.from(inputBoxes)
                .filter(b => b !== e.target) // Exclude current input
                .map(b => b.value);

            if (existingNumbers.includes(num.toString())) {
                e.target.value = ""; // Clear if duplicate
                return;
            }

            e.target.value = num.toString();
        }
    });

    box.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === "ArrowRight") {
            if (index < inputBoxes.length - 1) {
                inputBoxes[index + 1].focus();
            }
        } else if (e.key === "ArrowLeft") {
            if (index > 0) {
                inputBoxes[index - 1].focus();
            }
        }
    });
});

    
    document.querySelector(".reset-btn").addEventListener("click", () => {
        inputBoxes.forEach(box => box.value = "");
    });
}
