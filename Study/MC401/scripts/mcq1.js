

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
            question: "Q1. Which of the following is NOT a method for estimating the rate of return?",
            options: ["Arithmetic mean return", "Geometric mean return", "Standard deviation return", "Capital market line"],
            correctAnswer: 2,
        },
        {
            question: "Q2. What does the standard deviation of a portfolio measure?",
            options: ["The average return of the portfolio", "The risk of the portfolio", "The market risk of the portfolio", "The liquidity of the portfolio"],
            correctAnswer: 1,
        },
        {
            question: "Q3. Which model is used for Markowitz Risk-Return Optimization?",
            options: ["Mean-variance analysis", "Capital asset pricing model", "Arbitrage pricing theory", "Modigliani-Miller theorem"],
            correctAnswer: 0,
        },
        {
            question: "Q4. How is the performance of a portfolio evaluated?",
            options: ["By comparing it with the returns of a single asset", "By comparing it with the returns of a risk-free asset", "By comparing it with a benchmark index", "By comparing it with the returns of a mutual fund"],
            correctAnswer: 2,
        },
        {
            question: "Q5. Which of the following is NOT a factor considered in evaluating the performance of a portfolio?",
            options: ["Risk-adjusted return", "Sharpe ratio", "Standard deviation of individual assets", "Jensen's alpha"],
            correctAnswer: 2,
        },
        {
            question: "Q6. What factors should be considered in the investment policies of individuals?",
            options: ["Risk tolerance and time horizon", "Income level and age", "Investment goals and financial obligations", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q7. Which of the following is a tax-saving scheme in India?",
            options: ["National Pension Scheme (NPS)", "Public Provident Fund (PPF)", "Equity-linked Savings Scheme (ELSS)", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q8. What is the primary goal of estimating the rate of return?",
            options: ["To maximize returns", "To minimize risk", "To estimate future earnings", "To evaluate performance"],
            correctAnswer: 2,
        },
        {
            question: "Q9. How is the standard deviation of a portfolio calculated?",
            options: ["As the square root of the variance", "As the sum of the variances of individual assets", "As the average of the variances of individual assets", "As the square of the average of the variances of individual assets"],
            correctAnswer: 0,
        },
        {
            question: "Q10. Which of the following is a measure of risk-adjusted return?",
            options: ["Beta", "Alpha", "Standard deviation", "Sharpe ratio"],
            correctAnswer: 3,
        },
        {
            question: "Q11. What is the purpose of the Markowitz Risk-Return Optimization model?",
            options: ["To maximize returns", "To minimize risk", "To achieve a balance between risk and return", "To estimate future earnings"],
            correctAnswer: 2,
        },
        {
            question: "Q12. How is the performance of a portfolio compared to a benchmark index?",
            options: ["By calculating the Sharpe ratio", "By calculating the Treynor ratio", "By calculating the Jensen's alpha", "By calculating the Information ratio"],
            correctAnswer: 2,
        },
        {
            question: "Q13. Which of the following is NOT a factor considered in evaluating the performance of a portfolio?",
            options: ["Standard deviation", "Beta", "Alpha", "Liquidity of individual assets"],
            correctAnswer: 3,
        },
        {
            question: "Q14. What factors should be considered in the investment policies of individuals?",
            options: ["Income level", "Age", "Risk tolerance", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q15. Which of the following is a tax-saving scheme in India?",
            options: ["Employee Provident Fund (EPF)", "Sukanya Samriddhi Yojana (SSY)", "Senior Citizens Savings Scheme (SCSS)", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q16. What is the primary goal of estimating the rate of return?",
            options: ["To maximize returns", "To minimize risk", "To estimate future earnings", "To evaluate performance"],
            correctAnswer: 2,
        },
        {
            question: "Q17. How is the standard deviation of a portfolio calculated?",
            options: ["As the square root of the variance", "As the sum of the variances of individual assets", "As the average of the variances of individual assets", "As the square of the average of the variances of individual assets"],
            correctAnswer: 0,
        },
        {
            question: "Q18. Which of the following is a measure of risk-adjusted return?",
            options: ["Beta", "Alpha", "Standard deviation", "Sharpe ratio"],
            correctAnswer: 3,
        },
        {
            question: "Q19. What is the purpose of the Markowitz Risk-Return Optimization model?",
            options: ["To maximize returns", "To minimize risk", "To achieve a balance between risk and return", "To estimate future earnings"],
            correctAnswer: 2,
        },
        {
            question: "Q20. How is the performance of a portfolio compared to a benchmark index?",
            options: ["By calculating the Sharpe ratio", "By calculating the Treynor ratio", "By calculating the Jensen's alpha", "By calculating the Information ratio"],
            correctAnswer: 2,
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