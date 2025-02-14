const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const valentineImage = document.getElementById('valentineImage');
const h1 = document.querySelector('h1');

// Set initial image size
valentineImage.style.width = '250px';
valentineImage.style.height = 'auto';

const imageUrls = [
    "/static/images/valentine1.webp",
    "/static/images/valentine2.webp", 
    "/static/images/valentine3.webp",
    "/static/images/valentine4.webp",
    "/static/images/valentine5.webp",
    "/static/images/valentine6.webp",
    "/static/images/valentine7.webp",
    "/static/images/valentine8.webp",
    "/static/images/valentine9.webp",
    "/static/images/valentine10.webp",
    "/static/images/valentine11.webp"
];

const noTexts = [
    "Are you sure pookie?",
    "No second thoughts?",
    "Maybe reconsider?",
    "Are you completely certain bbpoo?",
    "Think about it!",
    "Is this your choice FR?",
    "One more chance?",
    "Are you decided?",
    "Final decision?",
    "Last opportunity!"
];

let currentImageIndex = 0;
let noIndex = 0;

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    valentineImage.src = imageUrls[currentImageIndex];
}

// Initial setup
showNextImage();

yesButton.addEventListener('click', () => {
    // Trigger confetti effect
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Change h1 text to success message
    h1.textContent = "Awww I knew you would say yes! We are meant to be ❤️";

    // Hide buttons and image
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
    valentineImage.style.display = 'none';
});

noButton.addEventListener('click', () => {
    showNextImage();
    
    // Change no button text
    noButton.textContent = noTexts[noIndex % noTexts.length];
    
    // Reduce button size and font size
    const scale = Math.max(0.5, 1 - (noIndex * 0.1));
    noButton.style.transform = `scale(${scale})`;
    noButton.style.fontSize = `${scale * 100}%`;
    noButton.style.transition = 'transform 0.3s ease, font-size 0.3s ease';

    noIndex++;
    
    // Only hide after exactly 10 clicks
    if (noIndex === 10) {
        noButton.style.display = 'none';
    }
});
