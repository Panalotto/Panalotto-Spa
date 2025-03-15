export default async function fetchLatestTalpak(dollarcon) {
    try {
        if (!(dollarcon instanceof HTMLElement)) {
            throw new Error("Invalid element passed to fetchLatestTalpak.");
        }

        const response = await fetch("http://localhost:3000/v1/talpak/get-pot");

        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }

        const jsonResponse = await response.json();

        if (!jsonResponse || typeof jsonResponse !== "object") {
            throw new Error("Invalid JSON response");
        }

        const { success, data } = jsonResponse;

        console.log("🔍 API Response:", data); // Debugging log

        if (success && data && typeof data.talpak_money === "number") {
            dollarcon.textContent = `$ ${data.talpak_money.toLocaleString()}`; // ✅ Proper update
        } else {
            console.warn("⚠ Unexpected response format:", jsonResponse);
            dollarcon.textContent = "$ 0"; // Fallback value
        }
    } catch (error) {
        console.error("❌ fetchLatestTalpak Error:", error.message);
        dollarcon.textContent = "$ 0"; // Fallback on error
    }
}
