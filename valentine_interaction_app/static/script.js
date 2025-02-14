const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const valentineImage = document.getElementById('valentineImage');
const h1 = document.querySelector('h1');


// Set initial image size
valentineImage.style.width = '180px';
valentineImage.style.height = 'auto';

const imageUrls = [
    "/static/images/valentine1.jpg",
    "/static/images/valentine2.jpg", 
    "/static/images/valentine3.jpg",
    "/static/images/valentine4.jpg",
    "/static/images/valentine5.jpg",
    "/static/images/valentine6.jpg",
    "/static/images/valentine7.jpg",
    "/static/images/valentine8.jpg",
    "/static/images/valentine9.jpg",
    "/static/images/valentine10.jpg",
    "/static/images/valentine11.jpg"
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
let yesSize = 1;
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
    
    // Change no button text and reduce size
    noButton.textContent = noTexts[noIndex % noTexts.length];
    noButton.style.transform = 'scale(0.8)';
    noButton.style.transition = 'transform 0.3s ease';

    // Move no button to random position within container bounds
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    const padding = 20; // Minimum padding from edges and other elements
    const maxX = containerRect.width - noButton.offsetWidth - padding;
    const maxY = containerRect.height - noButton.offsetHeight - padding;
    
    // Ensure button stays within visible bounds and doesn't overlap other elements
    const minX = padding;
    const minY = padding;
    
    let x, y;
    let attempts = 0;
    const maxAttempts = 100;
    let overlap = true;
    
    while (overlap && attempts < maxAttempts) {
        x = minX + Math.random() * maxX;
        y = minY + Math.random() * maxY;
        
        // Adjust position if it would extend beyond container bounds
        x = Math.min(x, containerRect.width - noButton.offsetWidth - padding);
        y = Math.min(y, containerRect.height - noButton.offsetHeight - padding);
        
        noButton.style.position = 'absolute';
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
        
        // Check for overlaps with other elements
        const elements = [yesButton, valentineImage, h1];
        overlap = elements.some(el => {
            const elRect = el.getBoundingClientRect();
            const noButtonRect = noButton.getBoundingClientRect();
            const elementPadding = 20; // Minimum distance from other elements
            
            return !(noButtonRect.right + elementPadding < elRect.left || 
                   noButtonRect.left - elementPadding > elRect.right ||
                   noButtonRect.bottom + elementPadding < elRect.top ||
                   noButtonRect.top - elementPadding > elRect.bottom);
        });
        
        attempts++;
    }
    
    if (attempts === maxAttempts) {
        // Fallback position if no valid position found
        noButton.style.left = `${minX}px`;
        noButton.style.top = `${minY}px`;
    }




    noIndex++;
    
    // Only hide after exactly 10 clicks
    if (noIndex >= 10) {
        noButton.style.display = 'none';
    }

});
