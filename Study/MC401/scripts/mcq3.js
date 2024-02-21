

document.addEventListener('DOMContentLoaded', function () {
    let currentQuestionIndex = 0;
    let selectedOption = null;
    let submittedAnswers = 0;
    let correctAnswers = 0;
    let userAnswers = [];
    let submittedForCurrentQuestion = false;

    const correctAudio = new Audio('correct.mp3');
    const wrongAudio = new Audio('wrong.mp3');

    const questions = [
        {
            question: "Q1. What is the Single Index Model (SIM) also known as?",
            options: ["Market model", "CAPM", "Market portfolio", "Efficient market hypothesis"],
            correctAnswer: 0,
        },
        {
            question: "Q2. What does the Single Index Model (SIM) seek to explain?",
            options: ["The relationship between a security and the market", "The relationship between two securities", "The relationship between risk and return", "The relationship between different markets"],
            correctAnswer: 0,
        },
        {
            question: "Q3. Which of the following is NOT a component of total risk in a portfolio?",
            options: ["Portfolio market risk", "Unique risk", "Systematic risk", "Market risk"],
            correctAnswer: 3,
        },
        {
            question: "Q4. What does portfolio market risk represent?",
            options: ["The risk that can be eliminated through diversification", "The risk that is inherent in the market", "The risk that is specific to an individual security", "The risk that is specific to a portfolio"],
            correctAnswer: 1,
        },
        {
            question: "Q5. What does unique risk represent?",
            options: ["The risk that can be eliminated through diversification", "The risk that is inherent in the market", "The risk that is specific to an individual security", "The risk that is specific to a portfolio"],
            correctAnswer: 2,
        },
        {
            question: "Q6. Which of the following statements is true about the Single Index Model (SIM)?",
            options: ["It uses multiple indices to explain stock returns", "It assumes that all stocks move together in the same direction", "It is based on the principle that a single index can represent the entire market", "It ignores market movements"],
            correctAnswer: 2,
        },
        {
            question: "Q7. What does portfolio total risk consist of?",
            options: ["Systematic risk only", "Market risk only", "Unique risk only", "Both market risk and unique risk"],
            correctAnswer: 3,
        },
        {
            question: "Q8. Which of the following is a characteristic of unique risk?",
            options: ["It can be eliminated through diversification", "It affects the entire market", "It is also known as market risk", "It is systematic in nature"],
            correctAnswer: 0,
        },
        {
            question: "Q9. What is the Simple Sharpe's Optimization Solution?",
            options: ["A method for calculating the Sharpe ratio", "A method for optimizing portfolio returns", "A method for calculating portfolio risk", "A method for evaluating market efficiency"],
            correctAnswer: 1,
        },
        {
            question: "Q10. What does the Single Index Model (SIM) assume about stock returns?",
            options: ["Stock returns are independent of the market", "Stock returns are linearly related to the market", "Stock returns are inversely related to the market", "Stock returns are random"],
            correctAnswer: 1,
        },
        {
            question: "Q11. Which of the following is a component of total risk in a portfolio?",
            options: ["Market risk", "Systematic risk", "Unique risk", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q12. What is portfolio market risk?",
            options: ["The risk that can be eliminated through diversification", "The risk that is inherent in the market", "The risk that is specific to an individual security", "The risk that is specific to a portfolio"],
            correctAnswer: 1,
        },
        {
            question: "Q13. What does unique risk represent?",
            options: ["The risk that can be eliminated through diversification", "The risk that is inherent in the market", "The risk that is specific to an individual security", "The risk that is specific to a portfolio"],
            correctAnswer: 2,
        },
        {
            question: "Q14. Which of the following statements is true about the Single Index Model (SIM)?",
            options: ["It uses multiple indices to explain stock returns", "It assumes that all stocks move together in the same direction", "It is based on the principle that a single index can represent the entire market", "It ignores market movements"],
            correctAnswer: 2,
        },
        {
            question: "Q15. What does portfolio total risk consist of?",
            options: ["Systematic risk only", "Market risk only", "Unique risk only", "Both market risk and unique risk"],
            correctAnswer: 3,
        },
        {
            question: "Q16. Which of the following is a characteristic of unique risk?",
            options: ["It can be eliminated through diversification", "It affects the entire market", "It is also known as market risk", "It is systematic in nature"],
            correctAnswer: 0,
        },
        {
            question: "Q17. What is the Simple Sharpe's Optimization Solution?",
            options: ["A method for calculating the Sharpe ratio", "A method for optimizing portfolio returns", "A method for calculating portfolio risk", "A method for evaluating market efficiency"],
            correctAnswer: 1,
        },
        {
            question: "Q18. What does the Single Index Model (SIM) assume about stock returns?",
            options: ["Stock returns are independent of the market", "Stock returns are linearly related to the market", "Stock returns are inversely related to the market", "Stock returns are random"],
            correctAnswer: 1,
        },
        {
            question: "Q19. Which of the following is a component of total risk in a portfolio?",
            options: ["Market risk", "Systematic risk", "Unique risk", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q20. What is portfolio market risk?",
            options: ["The risk that can be eliminated through diversification", "The risk that is inherent in the market", "The risk that is specific to an individual security", "The risk that is specific to a portfolio"],
            correctAnswer: 1,
        }
    ];
    
    

    function updateQuestion() {
        const questionContainer = document.getElementById('question');
        const optionsContainer = document.getElementById('options');
        const submitButton = document.getElementById('submit');
        const nextButton = document.getElementById('next');

        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionContainer.innerHTML = currentQuestion.question;

            optionsContainer.innerHTML = '';

            for (let i = 0; i < currentQuestion.options.length; i++) {
                const optionElement = document.createElement('p');
                optionElement.id = String.fromCharCode(65 + i);
                optionElement.innerHTML = currentQuestion.options[i];

                optionElement.addEventListener('click', function () {
                    if (!submittedForCurrentQuestion) {
                        if (selectedOption) {
                            selectedOption.classList.remove('selected');
                        }
                        selectedOption = optionElement;
                        selectedOption.classList.add('selected');
                        submitButton.disabled = false;
                        submitButton.style.opacity = 1;
                    }
                });

                optionsContainer.appendChild(optionElement);
            }

            nextButton.disabled = true;
            nextButton.style.opacity = 0.5;
        } else {
            showTotalResults();
            hideButtons();
            questionContainer.style.display = 'none';
            optionsContainer.style.display = 'none';
        }
    }

    function animateQuestionTransition(isNext) {
        const container = document.getElementById('options');
        container.style.transition = 'transform 0.5s ease-in-out';

        if (isNext) {
            container.style.transform = 'translateX(-100%)';
        } else {
            container.style.transform = 'translateX(100%)';
        }

        setTimeout(() => {
            container.style.transition = 'none';
            container.style.transform = 'translateX(0)';
            updateQuestion();
        }, 500);
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions.length && submittedForCurrentQuestion) {
            currentQuestionIndex++;
            animateQuestionTransition(true);
            resetQuizState();
        }
    }

    function previousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            animateQuestionTransition(false);
            resetQuizState();
        }
    }

    function resetQuizState() {
        if (selectedOption) {
            selectedOption.classList.remove('selected', 'correct-border');
            selectedOption = null;
        }
        document.getElementById('submit').classList.remove('correct', 'wrong');
        document.getElementById('submit').disabled = true;
        submittedForCurrentQuestion = false;
        document.getElementById('next').disabled = true;
        document.getElementById('next').style.opacity = 0.5;
    }

    function playSoundEffect(isCorrect) {
        if (isCorrect) {
            correctAudio.play();
        } else {
            wrongAudio.play();
        }
    }

    
    
    
    
function submitAnswer() {
    if (selectedOption !== null && !submittedForCurrentQuestion) {
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswerIndex = currentQuestion.correctAnswer;

        if (selectedOption.id === String.fromCharCode(65 + correctAnswerIndex)) {
            selectedOption.classList.add('correct-border');
            document.getElementById('submit').classList.add('correct');
            correctAnswers++;
            playSoundEffect(true);
        } else {
            // Highlight the correct answer
            const correctOption = document.getElementById(String.fromCharCode(65 + correctAnswerIndex));
            correctOption.classList.add('correct-border');

            document.getElementById('submit').classList.add('wrong');
            selectedOption.classList.add('wrong');
            playSoundEffect(false);
        }

        document.getElementById('submit').disabled = true;
        submittedAnswers++;
        userAnswers.push(selectedOption.id);

        updateProgressBar();
        document.getElementById('next').disabled = false;
        document.getElementById('next').style.opacity = 1;
        submittedForCurrentQuestion = true;
    }
}
    
    
    
    

    function updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        const progressPercentage = (submittedAnswers / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function showTotalResults() {
        const totalResultsContainer = document.getElementById('totalResults');
        const percentageCorrect = (correctAnswers / questions.length) * 100;

        let resultsHTML = `<p>Total Results:</p><p>${correctAnswers} out of ${questions.length} correct</p><p>${percentageCorrect.toFixed(2)}%</p><p>Your Answers:</p>`;

        for (let i = 0; i < questions.length; i++) {
            resultsHTML += `<p>Question ${i + 1}: `;
            resultsHTML += userAnswers[i] ? userAnswers[i] : "Not answered";
            resultsHTML += " (Correct Answer: ";
            resultsHTML += String.fromCharCode(65 + questions[i].correctAnswer);
            resultsHTML += ")</p>";
        }

        totalResultsContainer.innerHTML = resultsHTML;

        const submitButton = document.getElementById('submit');
        const restartButton = document.createElement('button');
        restartButton.innerHTML = 'Restart';
        restartButton.addEventListener('click', function () {
            location.reload();
        });

        submitButton.parentNode.replaceChild(restartButton, submitButton);

        totalResultsContainer.style.display = 'block';
    }

    function hideButtons() {
        document.getElementById('next').style.display = 'none';
        document.getElementById('previous').style.display = 'none';
    }

    document.getElementById('next').addEventListener('click', nextQuestion);
    document.getElementById('previous').addEventListener('click', previousQuestion);
    document.getElementById('submit').addEventListener('click', submitAnswer);

    updateQuestion();
});