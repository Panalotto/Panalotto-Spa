
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
                            <div class="info-label">Balance: ${data.balance}</div>
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
        </div>
        `;

        const timeElement = document.getElementById('time');
        const numberBoxes = document.querySelectorAll(".draw-box");
        const dollarcon = document.querySelector(".dollar-icon");
        

        if (!dollarcon) {
            console.error("❌ ERROR: .dollar-icon not found in DOM!");
        }

        connectWebSocket(timeElement, numberBoxes);
        await fetchLatestResult(numberBoxes);
       

        setTimeout(() => {
            fetchLatestTalpak(dollarcon);
        }, 500);

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
            e.preventDefault(); // Prevent page reload
            submitBet();
        });

    } catch (error) {
        console.error("❌ Error loading mainpage:", error);
        root.innerHTML = `<p style="color: red;">Error: Failed to load data.</p>`;
    }
}

async function submitBet() {
    const inputBoxes = document.querySelectorAll(".input-box");
    const numbers = Array.from(inputBoxes).map(box => box.value.trim());

    if (numbers.includes("")) {
        alert("Please enter all 6 numbers.");
        return;
    }


    const previous = await axios.get("http://localhost:3000/v1/result/latest-drawId");

    const draw_Id = previous + 1 || 1; 
    const betAmount = 1000; // Dapat dynamic ito
    const drawTime = new Date().toISOString().slice(0, 19).replace("T", " "); 

    // Convert array to string format
    const numbersString = numbers.join(", ");

    const payload = {
        draw_id : draw_Id,
        numbers: numbersString,  // Convert array to string
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
