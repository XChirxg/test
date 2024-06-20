document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('lifeParameters');
    const sliders = form.querySelectorAll('input[type="range"]');
    const parameterValues = form.querySelectorAll('span');
    const preferenceText = document.getElementById('preferenceText');
    const progressBar = document.querySelector('.progress-bar');
    const totalPoints = 500;
  
    sliders.forEach((slider) => {
      slider.addEventListener('input', function() {
        let sum = 0;
        sliders.forEach((s) => {
          sum += parseInt(s.value);
        });
  
        if (sum > totalPoints) {
          this.value -= (sum - totalPoints);
          sum = totalPoints;
          updateProgressBar();
          showExceedWarning();
        } else {
          updateValues();
          updateProgressBar();
        }
      });
    });
  
    function updateValues() {
      sliders.forEach((slider, index) => {
        if (slider.id === 'deathAge') {
          parameterValues[index].textContent = `${slider.value} Years`;
        } else {
          parameterValues[index].textContent = `${slider.value}%`;
        }
      });
    }
  
      
    function updateProgressBar() {
      let sum = Array.from(sliders).reduce((acc, slider) => acc + parseInt(slider.value), 0);
      let percentage = (sum / totalPoints) * 100;
      progressBar.style.width = `${percentage}%`;
    }
  
    function showExceedWarning() {
      progressBar.classList.add('exceed');
      setTimeout(() => {
        progressBar.classList.remove('exceed');
      }, 1000);
    }
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let emailBody = '';
        sliders.forEach((slider) => {
          emailBody += `${slider.previousElementSibling.textContent.replace(':', '')}: ${slider.value}%\n`;
        });
        window.location.href = `mailto:xchirxg@gmail.com?subject=Before Life Philosophy Response&body=${emailBody}`;
      });
  });
  