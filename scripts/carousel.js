const carouselTrack = document.querySelector('.carousel__track');
const slides = Array.from(document.querySelectorAll('.carousel__slide'));
const pagination = document.querySelector('.carousel__pagination');
const prevButton = document.querySelector('.carousel__button--prev');
const nextButton = document.querySelector('.carousel__button--next');

let currentIndex = 0;
let slidesPerView = 1;
let isAutoPlaying = true;
let autoplayTimer = null;

function updateSlidesPerView() {
    slidesPerView = window.innerWidth >= 1366 ? 3 : 1;
    currentIndex = Math.min(currentIndex, Math.max(0, slides.length - slidesPerView));
    updateSlidePosition();
}

function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth;
    const gap = window.innerWidth >= 1366 ? 20 : 0;
    const offset = currentIndex * (slideWidth + gap);
    carouselTrack.style.transform = `translateX(-${offset}px)`;
    if (window.innerWidth >= 1366) {
        const currentGroup = Math.ceil((currentIndex + slidesPerView) / slidesPerView);
        pagination.textContent = `${currentGroup * 3}/${slides.length}`;
    } else {
        pagination.textContent = `${currentIndex + 1}/${slides.length}`;
    }

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= slides.length - slidesPerView;
}

function nextSlide() {
    if (currentIndex < slides.length - slidesPerView) {
        currentIndex += slidesPerView;
        updateSlidePosition();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex -= slidesPerView;
        if (currentIndex < 0) currentIndex = 0;
        updateSlidePosition();
    }
}

prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
});

nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
});

function resetAutoplay() {
    if (isAutoPlaying) {
        stopAutoplay();
        startAutoplay();
    }
}

function startAutoplay() {
    if (!autoplayTimer) {
        autoplayTimer = setInterval(nextSlide, 4000);
    }
}

function stopAutoplay() {
    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
}

carouselTrack.addEventListener('mouseenter', stopAutoplay);
carouselTrack.addEventListener('mouseleave', () => {
    if (isAutoPlaying) startAutoplay();
});

window.addEventListener('resize', () => {
    updateSlidesPerView();
});

updateSlidesPerView();
startAutoplay();