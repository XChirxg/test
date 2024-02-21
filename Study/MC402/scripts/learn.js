document.addEventListener('DOMContentLoaded', function () {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    let startX = 0;
    let endX = 0;

    const correctAudio = new Audio('correct.mp3');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
        updateProgressBar(index);

        if (index === totalSlides - 1) {
            progressBar.style.backgroundColor = 'green';
            bottom.style.display = 'none';

            // Play sound when last slide is reached
            correctAudio.play();
        }
    }

    function updateProgressBar(index) {
        const progressBar = document.getElementById('progressBar');
        let progressPercentage;
        if (index === totalSlides - 1) {
            progressPercentage = 100;
        } else {
            progressPercentage = (index / (totalSlides - 1)) * 100;
        }
        progressBar.style.width = `${progressPercentage}%`;
    }

    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            showSlide(currentSlideIndex);
        }
    }

    function previousSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            showSlide(currentSlideIndex);
        }
    }

    function handleSwipe() {
        const difference = endX - startX;
        if (difference > 50) {
            // Swipe right
            previousSlide();
        } else if (difference < -50) {
            // Swipe left
            if (currentSlideIndex === totalSlides - 1) {
                // Play sound when swiping to last slide
                correctAudio.play();
            }
            nextSlide();
        }
    }

    document.getElementById('next').addEventListener('click', nextSlide);
    document.getElementById('previous').addEventListener('click', previousSlide);

    document.addEventListener('touchstart', function (event) {
        startX = event.touches[0].pageX;
    });

    document.addEventListener('touchend', function (event) {
        endX = event.changedTouches[0].pageX;
        handleSwipe();
    });

    // Initial setup
    showSlide(currentSlideIndex);
});
