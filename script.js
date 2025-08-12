const canvas = document.getElementById("rateCanvas");
const ctx = canvas.getContext("2d");

const dateInput = document.getElementById("dateValue");
const goldInput = document.getElementById("goldRate");
const silverInput = document.getElementById("silverRate");
const downloadBtn = document.getElementById("downloadBtn");

// Set today's date as default in yyyy-mm-dd format
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
dateInput.value = `${yyyy}-${mm}-${dd}`;

const templateImage = new Image();
templateImage.src = "template.jpeg";

templateImage.onload = function () {
    drawTemplate();
};

// Format date for canvas
function formatDateForCanvas(dateValue) {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function drawTemplate() {
    ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);

    // Date
    ctx.font = "bold 18px 'Square721 BT Roman'";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.fillText(`Date: ${formatDateForCanvas(dateInput.value)}`, 25, 180);

    // Gold rate
    ctx.font = "bold 48px 'Square721 BT Roman'";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(parseFloat(goldInput.value || 0).toFixed(2), 370, 365);

    // Silver rate
    ctx.fillText(parseFloat(silverInput.value || 0).toFixed(2), 370, 465);
}

// Live update
[dateInput, goldInput, silverInput].forEach(input => {
    input.addEventListener("input", drawTemplate);
});

downloadBtn.addEventListener("click", () => {
    Swal.fire({
        title: 'Are you ready to download?',
        text: "Your image will be saved with today's gold rate details.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, download!',
        cancelButtonText: 'No, cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            const link = document.createElement("a");

            // Get today's date
            const today = new Date();
            const datePart = today.toLocaleDateString("en-GB").replace(/\//g, "-");
            const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
            const monthName = today.toLocaleDateString("en-US", { month: "long" });

            // Create filename dynamically
            const fileName = `${datePart}-${dayName}-Today-GoldRate-Priya-Thanga-Maligai-Thanjavur-${monthName}.jpg`;

            link.download = fileName;
            link.href = canvas.toDataURL("image/jpeg", 1.0);
            link.click();

            // Show success message
            Swal.fire(
                'Downloaded!',
                'Your gold rate image has been saved.',
                'success'
            );
        }
    });
});


