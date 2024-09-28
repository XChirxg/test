document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('lifeParameters');
  const sliders = form.querySelectorAll('input[type="range"]');
  const parameterLabels = [
    'Love', 'Wealth', 'Health', 'Intelligence', 'Creativity', 
    'Beauty', 'Social Acceptance', 'Adventure', 'Luck', 'Death Age'
  ];
  const progressBar = document.querySelector('.progress-bar');
  const totalPoints = 500;
  
  const remainingPointsDisplay = document.getElementById('remainingPoints');
  
  // Informational Message Box Elements
  const infoMessageBox = document.getElementById('infoMessage');
  const infoText = document.getElementById('infoText');
  const closeInfoButton = document.getElementById('closeInfoButton');
  
  // Initialize Display Values
  updateValues();
  updateProgressBar();
  
  sliders.forEach((slider, index) => {
    slider.addEventListener('input', function() {
      let sum = 0;
      sliders.forEach((s) => {
        sum += parseInt(s.value);
      });
      
      if (sum > totalPoints) {
        // Calculate excess and adjust the current slider
        const excess = sum - totalPoints;
        this.value = parseInt(this.value) - excess;
        sum = totalPoints;
        updateValues();
        updateProgressBar();
        showExceedWarning();
      } else {
        updateValues();
        updateProgressBar();
      }
      
      // Update filled portion
      const value = this.value;
      this.style.setProperty('--value', `${value}%`);
      
      // Show informational message
      const label = parameterLabels[index];
      showInfoMessage(label, value);
    });
    
    // Optionally, show message on focus (for accessibility)
    slider.addEventListener('focus', function() {
      const label = parameterLabels[index];
      const value = this.value;
      showInfoMessage(label, value);
    });
  });

  function updateValues() {
    sliders.forEach((slider) => {
      let valueText = slider.value + "%";
      document.getElementById(slider.id + "Value").textContent = valueText;
    });
  }

  function updateProgressBar() {
    let sum = Array.from(sliders).reduce((acc, slider) => acc + parseInt(slider.value), 0);
    let remaining = totalPoints - sum;
    remainingPointsDisplay.textContent = remaining >=0 ? remaining : 0;
    
    let percentage = (sum / totalPoints) * 100;
    progressBar.style.width = `${percentage}%`;
    
    // Change progress bar color based on usage
    if (percentage > 100) {
      progressBar.classList.add('exceed');
    } else {
      progressBar.classList.remove('exceed');
      if (percentage > 80) {
        progressBar.style.backgroundColor = '#FFA500'; // Orange
      } else {
        progressBar.style.backgroundColor = '#FFD700'; // Gold
      }
    }
  }

  function showExceedWarning() {
    progressBar.classList.add('exceed');
    setTimeout(() => {
      progressBar.classList.remove('exceed');
    }, 1000);
  }

  // Generate custom messages based on percentage ranges
  function getParameterMessage(label, value) {
    let message = '';
    if (value <= 20) {
      message = `${label} is not a major priority for you with just ${value}%.`;
    } else if (value <= 40) {
      message = `You give moderate importance to ${label} with ${value}%.`;
    } else if (value <= 60) {
      message = `You value ${label} with a balanced ${value}%.`;
    } else if (value <= 80) {
      message = `${label} plays a significant role in your life with ${value}%.`;
    } else {
      message = `${label} is extremely important to you, rated at ${value}%.`;
    }
    return message;
  }

  // Display Informational Message Box
  function showInfoMessage(label, value) {
    const presence = value > 0 ? "presence" : "absence";
    const absence = value === 0 ? "absence" : "presence";
    
    let message = "";
    if (value > 0) {
      message = `Having ${label} significantly enhances your life by providing ${getEnhancement(label)}. Without it, you might experience ${getImpact(label)}.`;
    } else {
      message = `Lacking ${label} may lead to ${getImpact(label)}. Consider how ${label} can improve your life.`;
    }
    
    infoText.textContent = message;
    infoMessageBox.style.display = 'flex';
  }

  // Close Informational Message Box
  closeInfoButton.addEventListener('click', function() {
    infoMessageBox.style.display = 'none';
  });

  // Define how each parameter affects life
  function getEnhancement(label) {
    const enhancements = {
      'Love': 'emotional fulfillment and strong relationships',
      'Wealth': 'financial security and opportunities',
      'Health': 'physical well-being and energy',
      'Intelligence': 'problem-solving skills and adaptability',
      'Creativity': 'innovation and personal expression',
      'Beauty': 'self-confidence and social interactions',
      'Social Acceptance': 'sense of belonging and support',
      'Adventure': 'excitement and personal growth',
      'Luck': 'unexpected opportunities and favorable outcomes',
      'Death Age': 'perspective on life and legacy'
    };
    return enhancements[label] || 'various benefits';
  }

  function getImpact(label) {
    const impacts = {
      'Love': 'weaker emotional connections and loneliness',
      'Wealth': 'financial instability and limited opportunities',
      'Health': 'reduced energy and increased vulnerability to illness',
      'Intelligence': 'difficulty in adapting and solving problems',
      'Creativity': 'lack of innovation and personal expression',
      'Beauty': 'lower self-esteem and social challenges',
      'Social Acceptance': 'isolation and lack of support',
      'Adventure': 'stagnation and lack of personal growth',
      'Luck': 'fewer opportunities and challenges in navigating life',
      'Death Age': 'limited time to achieve goals and make an impact'
    };
    return impacts[label] || 'various challenges';
  }

  // Form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value || 'Anonymous';
    const age = document.getElementById('age').value || 'Unknown';

    // Collect parameter values
    const values = Array.from(sliders).map(slider => parseInt(slider.value));

    // Sort parameters based on values, excluding Death Age
    const sortedParameters = parameterLabels
      .map((label, index) => ({ label, value: values[index] }))
      .filter(param => param.label !== 'Death Age') // Exclude Death Age
      .sort((a, b) => b.value - a.value);

    // Extract highest and lowest rated parameters
    const [first, second, third] = sortedParameters.slice(0, 3);
    const leastImportant = sortedParameters[sortedParameters.length - 1];

    // Death Age value and special message
    const deathAgeValue = values[parameterLabels.indexOf('Death Age')];
    const deathAgeMessage = `You expect to live until ${deathAgeValue} years old. 🎉 Better make those years count!`;

    // Email body content (Plain Text)
    let emailBody = `Before Life Response Sheet\n\n`;
    emailBody += `Hey, I am ${name}, and I am ${age} years old. These are my opinions about life.\n\n`;

    emailBody += `Life Priorities Summary:\n`;
    emailBody += `1. Most Important: ${first.label} (${first.value}%)\n`;
    emailBody += `2. Second Most Important: ${second.label} (${second.value}%)\n`;
    emailBody += `3. Third Most Important: ${third.label} (${third.value}%)\n`;
    emailBody += `4. Least Important: ${leastImportant.label} (${leastImportant.value}%)\n\n`;

    emailBody += `Detailed Life Area Breakdown:\n`;
    sortedParameters.forEach(param => {
      emailBody += `${param.label}: ${param.value}% - ${getParameterMessage(param.label, param.value)}\n`;
    });

    emailBody += `\n---\n`;
    emailBody += `Death Age:\n${deathAgeMessage}\n`;

    emailBody += `\n---\n`;

    emailBody += `Copyable Data for Excel:\n`;
    emailBody += `Name, Age, ${parameterLabels.join(', ')}\n`;
    emailBody += `${name}, ${age}, ${values.join(', ')}\n\n`;

    // CSV Format (optional)
    let csvContent = `${parameterLabels.join(',')}\n${values.join(',')}`;

    // Email link with the body formatted as a plain text string
    window.location.href = `mailto:xchirxg@gmail.com?subject=Before Life Philosophy Response&body=${encodeURIComponent(emailBody)}`;
  });

  // Analyze Button
  const analyzeButton = document.getElementById('analyzeButton');
  const submitSection = document.getElementById('submitSection');
  const analysisSummary = document.getElementById('analysisSummary');
  const summaryContent = document.getElementById('summaryContent');
  const shareButton = document.getElementById('shareButton');

  analyzeButton.addEventListener('click', function() {
    generateAnalysisSummary();

    // Reveal Submit Button at the end of the page
    submitSection.style.display = 'block';
    // Scroll to Submit Section smoothly
    submitSection.scrollIntoView({ behavior: 'smooth' });
  });

  function generateAnalysisSummary() {
    const name = document.getElementById('name').value || 'Anonymous';
    const age = document.getElementById('age').value || 'Unknown';

    // Collect parameter values
    const values = Array.from(sliders).map(slider => parseInt(slider.value));

    // Sort parameters based on values, excluding Death Age
    const sortedParameters = parameterLabels
      .map((label, index) => ({ label, value: values[index] }))
      .filter(param => param.label !== 'Death Age') // Exclude Death Age
      .sort((a, b) => b.value - a.value);

    // Extract highest and lowest rated parameters
    const [first, second, third] = sortedParameters.slice(0, 3);
    const leastImportant = sortedParameters[sortedParameters.length - 1];

    // Death Age value and special message
    const deathAgeValue = values[parameterLabels.indexOf('Death Age')];
    const deathAgeMessage = `You expect to live until ${deathAgeValue} years old. 🎉 Better make those years count!`;

    // Populate Analysis Summary
    let summaryHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>
      <h3>Life Priorities Summary:</h3>
      <ul>
        <li><strong>Most Important:</strong> ${first.label} (${first.value}%)</li>
        <li><strong>Second Most Important:</strong> ${second.label} (${second.value}%)</li>
        <li><strong>Third Most Important:</strong> ${third.label} (${third.value}%)</li>
        <li><strong>Least Important:</strong> ${leastImportant.label} (${leastImportant.value}%)</li>
      </ul>
      <h3>Detailed Life Area Breakdown:</h3>
      <ul>
    `;
    sortedParameters.forEach(param => {
      summaryHTML += `<li>${param.label}: ${param.value}% - ${getParameterMessage(param.label, param.value)}</li>`;
    });
    summaryHTML += `
      </ul>
      <h3>Death Age:</h3>
      <p>${deathAgeMessage}</p>
    `;

    summaryContent.innerHTML = summaryHTML;
    analysisSummary.style.display = 'block'; // Show analysis summary
  }

  // Share Button Functionality
  shareButton.addEventListener('click', function() {
    const shareURL = window.location.href;
    const shareText = encodeURIComponent("Check out my Before Life Philosophy results! Explore your life priorities: ");
    const twitterURL = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareURL)}`;
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareURL)}`;

    // Create a popup window for sharing
    const popup = window.open('', 'Share', 'width=600,height=400');
    popup.document.write(`
      <html>
        <head><title>Share Your Results</title></head>
        <body style="background-color: #1a1a1a; color: #fff; font-family: 'Raleway', sans-serif; text-align: center; padding: 50px;">
          <h2>Share Your Before Life Philosophy Results</h2>
          <p>Choose a platform to share:</p>
          <a href="${twitterURL}" target="_blank" style="margin: 10px; padding: 10px 20px; background-color: #1DA1F2; color: #fff; text-decoration: none; border-radius: 5px;">Twitter</a>
          <a href="${facebookURL}" target="_blank" style="margin: 10px; padding: 10px 20px; background-color: #3b5998; color: #fff; text-decoration: none; border-radius: 5px;">Facebook</a>
          <br><br>
          <button onclick="window.close()" style="padding: 10px 20px; background-color: #FFD700; border: none; border-radius: 5px; cursor: pointer;">Close</button>
        </body>
      </html>
    `);
  });

  // Data Persistence (Optional Enhancement)
  // Save data on input
  form.addEventListener('input', function() {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    localStorage.setItem('lifeParameters', JSON.stringify(data));
    updateValues();
    updateProgressBar();
  });

  // Load data on page load
  const savedData = JSON.parse(localStorage.getItem('lifeParameters'));
  if (savedData) {
    sliders.forEach((slider) => {
      if (savedData[slider.id]) {
        slider.value = savedData[slider.id];
        slider.style.setProperty('--value', `${savedData[slider.id]}%`);
      }
    });
    updateValues();
    updateProgressBar();
  }
});



