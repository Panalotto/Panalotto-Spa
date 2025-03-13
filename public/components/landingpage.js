// import '../styles/landingpage.css';

export default function LandingPageComponent(root) {
    if (!root) {
        console.error("Root element not found!");  // ✅ Debugging help
        return;
    }

    root.innerHTML = `
    <div class="game-container">
        <img src="./icons/banner.png" alt="banner">
    </div>
    <button data-path="/signIn" class="play-button">TAP TO PLAY</button>
    `;

    console.log("Landing page loaded!");  // ✅ Confirm it runs
}
