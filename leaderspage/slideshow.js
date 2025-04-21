// Track the current slide
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Initialize the slideshow
function initSlideshow() {
    updateSlidePosition();
    updateDots();
    
    // Add entrance animation for the first slide
    animateSlideContent(0);
}

// Function to update slide position
function updateSlidePosition() {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    slidesWrapper.style.transform = `translateX(-${currentSlide * 25}%)`;
}

// Function to update indicator dots
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Function to animate slide content
function animateSlideContent(slideIndex) {
    const leaders = slides[slideIndex].querySelectorAll('.leader');
    
    // Reset all leaders to their initial state
    document.querySelectorAll('.leader').forEach(leader => {
        leader.style.opacity = '0';
        leader.style.transform = 'translateY(30px)';
    });
    
    // Animate the current slide's leaders
    leaders.forEach((leader, index) => {
        setTimeout(() => {
            leader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            leader.style.opacity = '1';
            leader.style.transform = 'translateY(0)';
        }, 100 + (index * 200)); // Staggered animation
    });
}

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
    updateDots();
    animateSlideContent(currentSlide);
}

// Function to move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
    updateDots();
    animateSlideContent(currentSlide);
}

// Function to go to a specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlidePosition();
    updateDots();
    animateSlideContent(currentSlide);
}

// Initialize slideshow on page load
document.addEventListener('DOMContentLoaded', initSlideshow);

// Optional: Auto-advance slides every 6 seconds
// Uncomment this code if you want automatic slideshow functionality
/*
let slideInterval = setInterval(() => {
    nextSlide();
}, 6000);

// Pause auto-advance when hovering over the slideshow
document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

// Resume auto-advance when mouse leaves the slideshow
document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 6000);
});
*/