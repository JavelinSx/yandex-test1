class StagesSlider {
    constructor(selector) {
        // Основные элементы слайдера
        this.slider = document.querySelector(selector);
        this.slidesContainer = this.slider.querySelector('.slider__slides');
        this.slides = this.slider.querySelectorAll('.slider__slide');
        this.dots = this.slider.querySelectorAll('.slider__dot');

        // Кнопки навигации
        this.prevButton = this.slider.querySelector('.slider__button--prev');
        this.nextButton = this.slider.querySelector('.slider__button--next');

        // Состояние слайдера
        this.currentSlide = 0;
        this.slidesCount = this.slides.length;
        this.isAnimating = false;

        // Bind методов
        this.goToSlide = this.goToSlide.bind(this);
        this.handleDotClick = this.handleDotClick.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);

        // Инициализация
        this.init();
    }

    init() {
        // Добавляем обработчики
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.handleDotClick(index));
        });

        // Добавляем обработчики для кнопок
        this.prevButton.addEventListener('click', () => {
            if (this.currentSlide > 0) {
                this.goToSlide(this.currentSlide - 1);
            }
        });

        this.nextButton.addEventListener('click', () => {
            if (this.currentSlide < this.slidesCount - 1) {
                this.goToSlide(this.currentSlide + 1);
            }
        });

        // Добавляем поддержку свайпов
        this.initSwipeDetection();

        // Обновляем состояние кнопок
        this.updateButtonsState();

        // Показываем/скрываем слайдер в зависимости от размера экрана
        this.handleResponsive();
        window.addEventListener('resize', () => this.handleResponsive());
    }

    updateButtonsState() {
        // Отключаем кнопку "назад" на первом слайде
        this.prevButton.disabled = this.currentSlide === 0;

        // Отключаем кнопку "вперед" на последнем слайде
        this.nextButton.disabled = this.currentSlide === this.slidesCount - 1;
    }

    handleResponsive() {
        const isMobile = window.innerWidth <= 768;
        this.slider.style.display = isMobile ? 'block' : 'none';
    }

    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;

        this.isAnimating = true;

        // Обновляем активную точку
        this.dots.forEach(dot => dot.classList.remove('slider__dot--active'));
        this.dots[index].classList.add('slider__dot--active');

        // Анимируем переход
        this.slidesContainer.style.transform = `translateX(-${index * 100}%)`;

        // Обновляем состояние
        this.currentSlide = index;

        // Обновляем состояние кнопок после смены слайда
        this.updateButtonsState();

        // Снимаем блокировку анимации
        setTimeout(() => {
            this.isAnimating = false;
        }, 300); // Длительность анимации
    }

    handleDotClick(index) {
        this.goToSlide(index);
    }

    initSwipeDetection() {
        let touchstartX = 0;
        let touchendX = 0;

        this.slider.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        });

        this.slider.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            this.handleSwipe(touchstartX - touchendX);
        });
    }

    handleSwipe(diff) {
        const minSwipeDistance = 50;

        if (Math.abs(diff) < minSwipeDistance) return;

        if (diff > 0 && this.currentSlide < this.slidesCount - 1) {
            // Свайп влево - следующий слайд
            this.goToSlide(this.currentSlide + 1);
        } else if (diff < 0 && this.currentSlide > 0) {
            // Свайп вправо - предыдущий слайд
            this.goToSlide(this.currentSlide - 1);
        }
    }
}

// Инициализация слайдера
document.addEventListener('DOMContentLoaded', () => {
    const slider = new StagesSlider('.slider');
});