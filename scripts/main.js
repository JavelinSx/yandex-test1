class RunningText {
    constructor(selector) {
        this.wrapper = document.querySelector(selector);
        this.content = this.wrapper.innerHTML;
        this.init();
    }

    init() {
        this.wrapper.innerHTML = this.content.repeat(4);
        this.position = 0;
        this.speed = 1;
        this.animate();
    }

    animate() {
        this.position -= this.speed;
        const itemWidth = this.wrapper.scrollWidth / 4;

        if (-this.position >= itemWidth) {
            this.position += itemWidth;
        }

        this.wrapper.style.transform = `translateX(${this.position}px)`;
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize instances
document.addEventListener('DOMContentLoaded', () => {
    new RunningText('.header-running-string-wrapper');
    new RunningText('.footer-running-string-wrapper');
});