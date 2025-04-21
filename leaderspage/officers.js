 // Executive Department Carousel Functionality
 document.addEventListener('DOMContentLoaded', function() {
    // Executive Department
    const execThumbnails = document.querySelectorAll('#exec-next, #exec-prev').length > 0 ? 
        document.querySelector('.department:nth-child(2)').querySelectorAll('.thumbnail') : [];
    const execMainImage = document.getElementById('exec-main-image');
    const execOfficerName = document.getElementById('exec-officer-name');
    const execOfficerPosition = document.getElementById('exec-officer-position');
    const execPrevBtn = document.getElementById('exec-prev');
    const execNextBtn = document.getElementById('exec-next');
    let execCurrentIndex = 0;

    // Legislative Department
    const legisThumbnails = document.querySelectorAll('#legis-next, #legis-prev').length > 0 ? 
        document.querySelector('.department:nth-child(3)').querySelectorAll('.thumbnail') : [];
    const legisMainImage = document.getElementById('legis-main-image');
    const legisOfficerName = document.getElementById('legis-officer-name');
    const legisOfficerPosition = document.getElementById('legis-officer-position');
    const legisPrevBtn = document.getElementById('legis-prev');
    const legisNextBtn = document.getElementById('legis-next');
    let legisCurrentIndex = 0;

    // Function to update active thumbnail and main image
    function updateCarousel(thumbnails, mainImage, nameEl, positionEl, index) {
        // Remove active class from all thumbnails
        thumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('active');
        });
        
        // Add active class to current thumbnail
        thumbnails[index].classList.add('active');
        
        // Update main image
        const newImgSrc = thumbnails[index].getAttribute('data-img');
        mainImage.src = newImgSrc;
        
        // Update officer info
        nameEl.textContent = thumbnails[index].getAttribute('data-name');
        positionEl.textContent = thumbnails[index].getAttribute('data-position');
    }

    // Executive Department Event Listeners
    if (execThumbnails.length > 0) {
        execThumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                execCurrentIndex = index;
                updateCarousel(execThumbnails, execMainImage, execOfficerName, execOfficerPosition, execCurrentIndex);
            });
        });

        execPrevBtn.addEventListener('click', () => {
            execCurrentIndex = (execCurrentIndex - 1 + execThumbnails.length) % execThumbnails.length;
            updateCarousel(execThumbnails, execMainImage, execOfficerName, execOfficerPosition, execCurrentIndex);
        });

        execNextBtn.addEventListener('click', () => {
            execCurrentIndex = (execCurrentIndex + 1) % execThumbnails.length;
            updateCarousel(execThumbnails, execMainImage, execOfficerName, execOfficerPosition, execCurrentIndex);
        });
    }

    // Legislative Department Event Listeners
    if (legisThumbnails.length > 0) {
        legisThumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                legisCurrentIndex = index;
                updateCarousel(legisThumbnails, legisMainImage, legisOfficerName, legisOfficerPosition, legisCurrentIndex);
            });
        });

        legisPrevBtn.addEventListener('click', () => {
            legisCurrentIndex = (legisCurrentIndex - 1 + legisThumbnails.length) % legisThumbnails.length;
            updateCarousel(legisThumbnails, legisMainImage, legisOfficerName, legisOfficerPosition, legisCurrentIndex);
        });

        legisNextBtn.addEventListener('click', () => {
            legisCurrentIndex = (legisCurrentIndex + 1) % legisThumbnails.length;
            updateCarousel(legisThumbnails, legisMainImage, legisOfficerName, legisOfficerPosition, legisCurrentIndex);
        });
    }
});