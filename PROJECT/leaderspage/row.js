// Function to scroll the leaders grid horizontally
function scrollLeaders(direction) {
    const cardsContainer = document.querySelector('.cards-container');
    const scrollAmount = 200; // Adjust this value as needed
    
    if (direction === 'left') {
        cardsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        cardsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Show/hide scroll indicators based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.cards-container');
    const leftIndicator = document.querySelector('.scroll-left');
    const rightIndicator = document.querySelector('.scroll-right');
    
    // Initially hide left indicator
    leftIndicator.style.opacity = '0';
    
    // Check if scrolling is needed
    if (cardsContainer.scrollWidth <= cardsContainer.clientWidth) {
        rightIndicator.style.display = 'none';
        leftIndicator.style.display = 'none';
    }
    
    // Update indicators on scroll
    cardsContainer.addEventListener('scroll', function() {
        // Show/hide left indicator
        if (cardsContainer.scrollLeft > 20) {
            leftIndicator.style.opacity = '0.8';
        } else {
            leftIndicator.style.opacity = '0';
        }
        
        // Show/hide right indicator
        if (cardsContainer.scrollLeft >= cardsContainer.scrollWidth - cardsContainer.clientWidth - 20) {
            rightIndicator.style.opacity = '0';
        } else {
            rightIndicator.style.opacity = '0.8';
        }
    });
});