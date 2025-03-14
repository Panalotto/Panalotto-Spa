// import '../styles/landingpage.css';

export default function LandingPageComponent(root) {
    if (!root) {
        console.error("Root element not found!");
        return;
    }

    root.innerHTML = `
    <div id="landing-header">
        <button data-path="/signIn" id="login-btn">Login</button>
        <button data-path="/signup" id="register-btn">Sign Up</button>
    </div>
    <div class="game-container">
    <img src="../icons/banner.png">
        
    </div>
    <button id="play-button" class="play-button">TAP TO PLAY</button>

    <!-- Full-Screen Black Overlay -->
    <div id="popup-overlay" class="popup-overlay hidden"></div>

    <!-- Popup Message -->
    <div id="message-popup" class="popup hidden">
        <div id="popup-content">
            <h3 id="notif">Notification</h3>
            <p class="popup-msg">You have to login to play the game</p>
            <p class="popup-msg">If you do not have an account, just click the register button to sign up</p>
            <button id="close-popup">OK</button>
        </div>
    </div>`;

    const playButton = document.getElementById('play-button');
    const popup = document.getElementById('message-popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const closePopup = document.getElementById('close-popup');

    playButton.addEventListener('click', (event) => {
        event.preventDefault();
        popup.classList.remove('hidden');
        popupOverlay.classList.remove('hidden'); // Show overlay
    });

    closePopup.addEventListener('click', () => {
        popup.classList.add('hidden');
        popupOverlay.classList.add('hidden'); // Hide overlay
    });

    console.log("Landing page loaded!");
}