let quizData = [];
let currentQuestionIndex = 0;
let timer;
let countdown;
let correctAnswers = 0;
let totalTimeTaken = 0;
let categoryStats = {};
let startTime;

let totalQuestions = 0; // Track the total number of questions


const textBox = document.getElementById('text-box');
const loadQuizButton = document.getElementById('load-quiz');
const quizSection = document.getElementById('quiz-section');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextQuestionButton = document.getElementById('next-question');
const questionTimerSlider = document.getElementById('question-timer-slider');
const sliderValueElement = document.getElementById('slider-value');
const themeSelect = document.getElementById('theme');
const timerElement = document.getElementById('timer');
const correctAnswersElement = document.getElementById('correct-answers');
const percentageElement = document.getElementById('percentage');
const averageTimeElement = document.getElementById('average-time');
const leastTimeCategoryElement = document.getElementById('least-time-category');
const categoryRankingsElement = document.getElementById('category-rankings');
const restartTestButton = document.getElementById('restart-test');
const refreshPageButton = document.getElementById('refresh-page');



const fileInput = document.getElementById('file-input');

const copyTextButton = document.getElementById('copy-text');
const clearPasteButton = document.getElementById('clear-paste-text');

// Load audio files
const winSound = new Audio('win.mp3');
const wrongSound = new Audio('wrong.mp3');
const nextSound = new Audio('next.mp3');

let isMuted = false;

// Mute Toggle Functionality
const muteToggle = document.getElementById('mute-toggle');
muteToggle.addEventListener('change', (e) => {
isMuted = e.target.checked;
});

// Play sound function
const playSound = (sound) => {
if (!isMuted) {
    sound.currentTime = 0; // Reset sound to the beginning
    sound.play();
}
};



// Load JSON File
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                textBox.value = JSON.stringify(data, null, 2);
            } catch (error) {
                alert("Invalid JSON file. Please try again.");
            }
        };
        reader.readAsText(file);
    }
});

// Copy Text to Clipboard
copyTextButton.addEventListener('click', () => {
    textBox.select();
    document.execCommand('copy');
    alert("Text copied to clipboard! Now paste it on Some AI LLM");
});


clearPasteButton.addEventListener('click', async () => {
    try {
        // Check if the Clipboard API is supported
        if (navigator.clipboard && navigator.clipboard.readText) {
            // Get the text from the clipboard
            const clipboardText = await navigator.clipboard.readText();
            textBox.value = clipboardText; // Paste the clipboard content into the text box
            
        } else {
            alert("Clipboard API not supported in this browser.");
        }
    } catch (error) {
        console.error("Failed to paste text from clipboard:", error);
        alert("Unable to paste text. Please check your browser settings.");
    }
});



// Update slider value display
questionTimerSlider.addEventListener('input', () => {
    sliderValueElement.textContent = `${questionTimerSlider.value}s`;
});

// Theme switching
themeSelect.addEventListener('change', () => {
    document.body.className = themeSelect.value;
});

// Load Quiz
loadQuizButton.addEventListener('click', () => {
    try {
        const inputData = JSON.parse(textBox.value.trim());
        quizData = inputData.questions || [];
        if (quizData.length === 0) throw new Error("No questions found!");
        totalQuestions = quizData.length; // Set the total questions

        currentQuestionIndex = 0;
        correctAnswers = 0;
        totalTimeTaken = 0;
        categoryStats = {};

      // Initialize the progress bar
        updateProgressBar();

        displayQuestion();
        quizSection.style.display = 'block';
        document.getElementById('summary-section').style.display = 'none';
        document.getElementById('hideForQuiz').style.display = 'none';
        document.getElementById('footer-section').style.display = 'none';
        

        if (document.documentElement.requestFullscreen) {
             document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }


        
    } catch (e) {
        alert("Invalid input! Please check your template.");
        
    }
});

// Display a question
function displayQuestion() {
    const questionData = quizData[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;
    optionsElement.innerHTML = '';
    feedbackElement.textContent = '';
    feedbackElement.style.display = 'none';
    nextQuestionButton.style.display = 'none';
    timerElement.textContent = '';

    const timerValue = parseInt(questionTimerSlider.value);
    clearInterval(countdown);
    let timeLeft = timerValue;
    startTime = Date.now();
    countdown = setInterval(() => {
        timerElement.textContent = ` ${timeLeft} sec`;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(countdown);
            showCorrectAnswer();
        }
    }, 1000);

    for (const [key, value] of Object.entries(questionData.options)) {
        const li = document.createElement('li');
        li.className = 'option';
        li.textContent = `${key}: ${value}`;
        li.addEventListener('click', () => checkAnswer(key));
        optionsElement.appendChild(li);
    }
     // Update the progress bar
     updateProgressBar();
}

    // Update progress bar based on current question index
function updateProgressBar() {
const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
}

// Check Answer
function checkAnswer(selectedOption) {
    clearInterval(countdown);
    const questionData = quizData[currentQuestionIndex];
    const timeTaken = (Date.now() - startTime) / 1000;
    totalTimeTaken += timeTaken;

    const category = questionData.category;
    if (!categoryStats[category]) {
        categoryStats[category] = { correct: 0, times: [] };
        
    }
    categoryStats[category].times.push(timeTaken);

    const isCorrect = selectedOption === questionData.correctOption;
    if (isCorrect) {
        correctAnswers++;
        categoryStats[category].correct++;
        playSound(winSound);
    }
    else {
        playSound(wrongSound);  // Plays sound when wrong answer is selected
    }
    

    feedbackElement.textContent = isCorrect
        ? `Correct! ${questionData.explanation}`
        : `Wrong! Correct answer is ${questionData.correctOption}. ${questionData.explanation}`;
        
    feedbackElement.style.color = isCorrect ? 'green' : 'red';
    feedbackElement.style.display = 'block';

    disableOptions();
    nextQuestionButton.style.display = 'inline-block';
}

// Show correct answer after timeout
function showCorrectAnswer() {
    const questionData = quizData[currentQuestionIndex];
    feedbackElement.textContent = `Time's up! Correct answer is ${questionData.correctOption}. ${questionData.explanation}`;
    playSound(wrongSound);
    feedbackElement.style.color = 'red';
    feedbackElement.style.display = 'block';
    disableOptions();
    nextQuestionButton.style.display = 'inline-block';
}

// Disable options after selecting an answer
function disableOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
}

// Go to the next question
nextQuestionButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizData.length) {
        endQuiz();
    } else {
        displayQuestion();
        playSound(nextSound);
    }
});

// End the quiz
function endQuiz() {
    quizSection.style.display = 'none';
    document.getElementById('summary-section').style.display = 'block';
    correctAnswersElement.textContent = `Correct Answers: ${correctAnswers}`;
    const percentage = ((correctAnswers / quizData.length) * 100).toFixed(2);
    percentageElement.textContent = `Percentage: ${percentage}%`;
    const averageTime = (totalTimeTaken / quizData.length).toFixed(2);
    averageTimeElement.textContent = `Average Time per Question: ${averageTime}s`;

    const leastTimeCategory = Object.entries(categoryStats)
        .sort((a, b) => {
            const avgA = a[1].times.reduce((sum, t) => sum + t, 0) / a[1].times.length;
            const avgB = b[1].times.reduce((sum, t) => sum + t, 0) / b[1].times.length;
            return avgA - avgB;
        })[0];
    leastTimeCategoryElement.textContent = `Least Time Category: ${
        leastTimeCategory ? leastTimeCategory[0] : 'N/A'
    }`;

    categoryRankingsElement.innerHTML = '';
    for (const [category, stats] of Object.entries(categoryStats)) {
        const li = document.createElement('li');
        li.textContent = `${category}: ${stats.correct} correct answers`;
        categoryRankingsElement.appendChild(li);
    }
}

// Restart the quiz
restartTestButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    totalTimeTaken = 0;
    categoryStats = {};
    displayQuestion();
    quizSection.style.display = 'block';
    document.getElementById('summary-section').style.display = 'none';
});

// Refresh the page
refreshPageButton.addEventListener('click', () => {
    location.reload();
});



