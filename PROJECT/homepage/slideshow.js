// Add this to your slideshow.js file or include it in a script tag at the end of your HTML

let slideIndex = 0;
const slidesContainer = document.getElementById('slides-container');
const dots = document.querySelectorAll('.dot');
let totalSlides;

// Initialize slideshow
document.addEventListener('DOMContentLoaded', function() {
    totalSlides = document.querySelectorAll('.officer-slide').length;
    showSlide(slideIndex);
    
    // Optional: Auto-play slideshow
    const slideInterval = setInterval(function() {
        moveSlide(1);
    }, 5000);
    
    // Stop auto-play on hover
    document.querySelector('.officers-slideshow').addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
});

// Function to move to next/previous slide
function moveSlide(n) {
    showSlide(slideIndex += n);
}

// Function to show specific slide
function currentSlide(n) {
    showSlide(slideIndex = n);
}

// Function to display slides
function showSlide(n) {
    // Get total slides if not already set
    if (!totalSlides) {
        totalSlides = document.querySelectorAll('.officer-slide').length;
    }
    
    // Handle wrapping around
    if (n >= totalSlides) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = totalSlides - 1;
    }
    
    // Move slides
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === slideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}


// Add this to your slideshow.js file

// Variables for transparency slideshow
let transparencyIndex = 0;
const totalTransparencySlides = 3; // Placeholder - change when actual slides are added

// Function to move transparency slides
function moveTransparencySlide(n) {
    showTransparencySlide(transparencyIndex += n);
}

// Function to jump to a specific transparency slide
function currentTransparencySlide(n) {
    showTransparencySlide(transparencyIndex = n);
}

// Function to show a specific transparency slide
function showTransparencySlide(n) {
    // Handle wrapping around
    if (n >= totalTransparencySlides) {
        transparencyIndex = 0;
    }
    if (n < 0) {
        transparencyIndex = totalTransparencySlides - 1;
    }
    
    // Update dots for transparency slideshow
    const transparencyDots = document.querySelectorAll('#transparency-dots-container .dot');
    if (transparencyDots && transparencyDots.length > 0) {
        transparencyDots.forEach((dot, index) => {
            if (index === transparencyIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Note: This function is a placeholder since we don't have actual slides yet
    // When actual slides are added, you'll need to update this function to move them
}

// Initialize transparency slideshow when page loads
document.addEventListener('DOMContentLoaded', function() {
    showTransparencySlide(transparencyIndex);
});