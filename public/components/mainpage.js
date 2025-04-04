import connectWebSocket from './connectWeb/connectCountdown.js';
import fetchLatestResult from './connectWeb/connectLatestResult.js';
import fetchLatestTalpak from './connectWeb/connectLatestTalpak.js';

export default async function mainpage(root) {

    try {
        const response = await axios.get('http://localhost:3000/v1/account', {
            headers: {
                apikey: 'panalotto',
                token: localStorage.getItem('token'),
            }
        });

        if (response.data.success !== true) {
            throw new Error("Unauthorized access or API issue.");
        }

        const data = response.data.data;

        root.innerHTML = `
        <div class="containermainpage">
            <div class="group-bar">
                <h1 id="headtext">PANALOTTO</h1>
                <div class="avatar">
                    <a href="/profile" data-path="/profile">👤</a>
                </div>
            </div>

            <div class="draw-section">
                <div class="draw-title"> <span id="time"></span></div>
                <div class="draw-boxes">
                    ${Array(6).fill('<div class="draw-box">--</div>').join('')}
                </div>
            </div>
            <div class="input-section">
                <form enctype="multipart/form-data" id="talpak">
                    <div class="input-title">Bet your Lucky Numbers</div>
                    <div class="input-boxes">
                    ${Array(6).fill('<input type="text" class="input-box" maxlength="2" pattern="[0-9]{1,2}">').join('')}
                    </div>
                    <div class="buttons">
                        <button type="submit" class="btn enter-btn">Bet</button>
                        <button type="button" class="btn reset-btn">Reset</button>
                    </div>
                </form>
                <div class="info-section">
                    <div class="info-left">
                        <div class="info-box bet-box">
                            <div class="info-label">Bet for only $1000 </div>
                        </div>
                        <div class="info-box balance-box">
                            <div class="info-label">Balance:$ ${data.balance}</div>
                        </div>
                    </div>
                    <div class="info-right">
                        <div class="info-box prize-box">
                            <div class="info-label">Prize <span class="dollar-icon">$ </span></div>
                            <div class="coin">
                                <img src="https://cdn-icons-png.flaticon.com/512/217/217853.png" alt="Coin">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="popUp-modal">
                <div class="container-modal">
                    <div class="container neon-frame">
                        <h1>Draw Results</h1>
                        <div class="result-section">
                            <div class="winning-numbers-section">
                                <h3>Winning Numbers</h3>
                                <div class="number-display">
                                    <p class="winner-number"><strong>--</strong></p>
                                </div>
                            </div>
                        </div>
                        <div class="prize-section">
                            <h3>Prize</h3>
                            <div class="info-label">$ <span class="dollar-icon">0</span></div>
                        </div>
                        <div class="winner-info-section">
                            <h3>Winners</h3>
                            <div class="winner-list">
                                <p>Awaiting results...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        const timeElement = document.getElementById('time');
        const numberBoxes = document.querySelectorAll(".draw-box");
        const dollarcon = document.querySelector(".dollar-icon");

        const popupModal = document.querySelector(".popUp-modal");
        if (popupModal) {
            popupModal.style.display = "none";
        }

        if (!dollarcon) {
            console.error("❌ ERROR: .dollar-icon not found in DOM!");
        }

        connectWebSocket(timeElement, numberBoxes);
        await fetchLatestResult(numberBoxes);

        setTimeout(() => {
            fetchLatestTalpak(dollarcon);
        }, 500);

        if (window.ws) {
            window.ws.addEventListener("message", (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log("WebSocket message received:", data);
                    if (data.event === "roundFinished") {
                        const winningNumbers = data.result;
                        console.log("Showing popup with winning numbers:", winningNumbers);
                        showWinningNumbersPopup(winningNumbers);
                    }
                } catch (error) {
                    console.error("Error processing WebSocket message:", error);
                }
            });
        }

        const inputBoxes = document.querySelectorAll(".input-box");

        inputBoxes.forEach((box, index) => {
            box.addEventListener("input", (e) => {
                let value = e.target.value.replace(/\D/g, ''); 

                if (value !== "") {
                    let num = parseInt(value, 10);
                    num = Math.max(1, Math.min(45, num)); 

                    let existingNumbers = Array.from(inputBoxes)
                        .filter(b => b !== e.target)
                        .map(b => b.value);

                    if (existingNumbers.includes(num.toString())) {
                        e.target.value = "";
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

        document.querySelector("#talpak").addEventListener("submit", async (e) => {
            e.preventDefault();
            submitBet();
        });

    } catch (error) {
        console.error("❌ Error loading mainpage:", error);
        root.innerHTML = `<p style="color: red;">Error: Failed to load data.</p>`;
    }
}

async function submitBet() {
    if (!window.ws || window.ws.readyState !== WebSocket.OPEN) {
        alert("WebSocket is not connected. Please refresh or check server.");
        return;
    }

    const inputBoxes = document.querySelectorAll(".input-box");
    const numbers = Array.from(inputBoxes).map(box => box.value.trim());

    if (numbers.includes("")) {
        alert("Please enter all 6 numbers.");
        return;
    }

    const betAmount = 1000;
    const drawTime = new Date().toISOString().slice(0, 19).replace("T", " "); 
    const numbersString = numbers.join("- ");

    const payload = {
        numbers: numbersString,
        bet_amount: betAmount,
        draw_time: drawTime
    };

    console.log("Submitting payload:", payload);

    try {
        const response = await fetch("http://localhost:3000/v1/talpak/enter-na", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "apikey": "panalotto",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log("Server Response:", data);

        if (response.ok) {
            window.location.assign('/mainpage');
            inputBoxes.forEach(box => box.value = "");
        } else {
            alert("Bet submission failed.");
        }
    } catch (error) {
        console.error("Error submitting bet:", error);
    }
}

function showWinningNumbersPopup(winningNumbers) {
    console.log("showWinningNumbersPopup called with:", winningNumbers);
    
    const popupModal = document.querySelector(".popUp-modal");
    const winnerNumberElement = document.querySelector(".winner-number strong");
    const prizeLabel = document.querySelector(".prize-section .info-label");
    
    console.log("Popup elements:", { 
        popupModal: !!popupModal, 
        winnerNumberElement: !!winnerNumberElement, 
        prizeLabel: !!prizeLabel
    });
    
    if (!popupModal || !winnerNumberElement) {
        console.error("Popup elements not found in DOM");
        return;
    }

    let formattedNumbers;
    let winningArray = winningNumbers;
    if (typeof winningNumbers === "string") {
        formattedNumbers = winningNumbers;
        winningArray = winningNumbers.split(/[-\s]+/).map(num => num.trim());
    } else if (Array.isArray(winningNumbers)) {
        formattedNumbers = winningNumbers.join(" ");
        winningArray = winningNumbers.map(num => String(num).trim());
    } else {
        console.error("Invalid winning numbers format:", winningNumbers);
        return;
    }

    console.log("Formatted winning numbers:", formattedNumbers);
    console.log("Winning array:", winningArray);

    const isMobile = window.innerWidth <= 599;

    if (isMobile && winningArray.length > 5) {
        winnerNumberElement.textContent = formattedNumbers;
    } else {
        winnerNumberElement.textContent = formattedNumbers;
    }

    popupModal.style.display = "flex";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        popupModal.classList.add("active");
        console.log("Popup should be visible now");
    }, 10);
    
    checkUserWin(winningNumbers, prizeLabel);
    fetchWinnerInfo();

    setTimeout(() => closePopup(popupModal), 5000);
}

function checkUserWin(winningNumbers, prizeLabel) {
    console.log("checkUserWin called with prizeLabel:", prizeLabel);
    
    const inputBoxes = document.querySelectorAll(".input-box");
    const userNumbers = Array.from(inputBoxes).map(box => box.value.trim()).filter(val => val !== "");

    let winningArray = winningNumbers;
    if (typeof winningNumbers === "string") {
        winningArray = winningNumbers.split(/[-\s]+/).map(num => num.trim());
    } else if (Array.isArray(winningNumbers)) {
        winningArray = winningNumbers.map(num => String(num).trim());
    } else {
        console.error("Invalid winning numbers format:", winningNumbers);
        return;
    }

    console.log("User numbers:", userNumbers);
    console.log("Winning numbers:", winningArray);

    const popupTitle = document.querySelector(".container-modal h1");

    if (userNumbers.length === 6) {
        console.log("Popup title element:", popupTitle);

        if (popupTitle) {
            const matchCount = userNumbers.filter(num => winningArray.includes(num)).length;
            console.log("Match count:", matchCount);

            let prizeAmount = 0;
            if (matchCount === 6) {
                prizeAmount = 100000;
                popupTitle.textContent = "JACKPOT! You Won!";
            } else if (matchCount === 5) {
                prizeAmount = 5000;
                popupTitle.textContent = "Great! 5 Matches!";
            } else if (matchCount >= 3) {
                prizeAmount = 1000;
                popupTitle.textContent = `${matchCount} Matches!`;
            } else {
                prizeAmount = 0;
                popupTitle.textContent = "No Win. Try Again!";
            }

            prizeLabel.innerHTML = `$ <span class="dollar-icon">${prizeAmount}</span>`;
        }
    }
}

function fetchWinnerInfo() {
    const winnerList = document.querySelector(".winner-list");
    if (winnerList) {
        winnerList.innerHTML = "<p>1st: John Doe<br>2nd: Jane Smith<br>3rd: Bob Lee</p>";
    }
}

function closePopup(popupModal) {
    popupModal.classList.remove("active");
    popupModal.style.display = "none";
    document.body.style.overflow = "";
}