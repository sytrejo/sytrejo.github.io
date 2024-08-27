let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll('.carousel-images img');
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex].style.display = "block";  
}

function moveSlide(n) {
    slideIndex += n;
    showSlides();
}

// Initialize carousel
showSlides();
setInterval(() => {
    slideIndex++;
    showSlides();
}, 3000); // Change slide every 3 seconds
