let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const carousel = document.querySelector('.carousel');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Optional: Auto-slide every 5 seconds
setInterval(nextSlide, 5000);


leftButton.addEventListener('click', () => {
    carousel.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
});

rightButton.addEventListener('click', () => {
    carousel.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
});

const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.carousel-card');
const dotsContainer = document.querySelector('.carousel-dots');
const leftArrow = document.querySelector('.carousel-arrow-left');
const rightArrow = document.querySelector('.carousel-arrow-right');
let currentIndex = 0;

// Generate dots dynamically based on the number of cards
cards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
});

// Update the carousel and active dot
function updateCarousel(index) {
    const offset = -index * cards[0].clientWidth;
    track.style.transform = `translateX(${offset}px)`;
    document.querySelectorAll('.carousel-dot').forEach(dot => dot.classList.remove('active'));
    document.querySelector(`.carousel-dot[data-index="${index}"]`).classList.add('active');
}

// Handle dot clicks
dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('carousel-dot')) {
        currentIndex = parseInt(e.target.dataset.index);
        updateCarousel(currentIndex);
    }
});

// Handle arrow clicks
leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
    updateCarousel(currentIndex);
});

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
    updateCarousel(currentIndex);
});
