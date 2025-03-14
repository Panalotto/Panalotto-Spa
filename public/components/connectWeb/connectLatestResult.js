export default async function fetchLatestResult(numberBoxes) {
    try {
        const response = await fetch("http://localhost:3000/v1/result/latest-result");
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

        const latestResult = await response.json();
        if (latestResult.success && Array.isArray(latestResult.winning_numbers)) {
            numberBoxes.forEach((box, index) => {
                box.textContent = latestResult.winning_numbers[index] || "--";
            });
        } else {
            console.warn("Invalid winning numbers format:", latestResult);
        }
    } catch (error) {
        console.error("Failed to fetch latest draw result:", error);
    }
}
