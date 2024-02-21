

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
            question: "Q1. What does the Capital Market Line (CML) represent?",
            options: ["The set of efficient portfolios", "The set of all possible portfolios", "The set of risky portfolios", "The set of risk-free portfolios"],
            correctAnswer: 0,
        },
        {
            question: "Q2. What is the Security Market Line (SML) used for?",
            options: ["To evaluate the performance of individual stocks", "To predict market trends", "To calculate the risk-free rate", "To determine the expected return of an asset given its risk"],
            correctAnswer: 3,
        },
        {
            question: "Q3. How does the Capital Market Line (CML) differ from the Security Market Line (SML)?",
            options: ["CML includes only risky assets, while SML includes both risky and risk-free assets", "CML represents the efficient portfolios, while SML represents all possible portfolios", "CML is a straight line, while SML is a curved line", "CML has a positive slope, while SML has a negative slope"],
            correctAnswer: 0,
        },
        {
            question: "Q4. What is the primary goal of the Capital Market Line (CML)?",
            options: ["To determine the risk-free rate", "To identify the market risk premium", "To represent the risk-return tradeoff for efficient portfolios", "To predict market trends"],
            correctAnswer: 2,
        },
        {
            question: "Q5. What does the slope of the Capital Market Line (CML) represent?",
            options: ["The risk-free rate", "The market risk premium", "The Sharpe ratio", "The standard deviation of the market index"],
            correctAnswer: 1,
        },
        {
            question: "Q6. Which of the following statements is true about the Capital Market Line (CML)?",
            options: ["It is a graphical representation of the efficient frontier", "It represents the set of all possible portfolios", "It is a straight line that connects the risk-free rate to the market portfolio", "It indicates the relationship between risk and return for individual securities"],
            correctAnswer: 2,
        },
        {
            question: "Q7. What is the main concept behind the Security Market Line (SML)?",
            options: ["The relationship between risk and return for individual securities", "The relationship between risk and return for the market portfolio", "The relationship between risk and return for risk-free securities", "The relationship between risk and return for efficient portfolios"],
            correctAnswer: 0,
        },
        {
            question: "Q8. What is the risk-free rate used for in the context of the Security Market Line (SML)?",
            options: ["To calculate the expected return of a portfolio", "To eliminate all risk from a portfolio", "To determine the market risk premium", "To evaluate company financials"],
            correctAnswer: 0,
        },
        {
            question: "Q9. How is the Security Market Line (SML) related to the Capital Market Line (CML)?",
            options: ["They are parallel lines", "They intersect at the market portfolio", "They have the same slope", "They represent the same concept"],
            correctAnswer: 1,
        },
        {
            question: "Q10. What is the main concept behind the Capital Market Line (CML)?",
            options: ["The relationship between risk and return for individual securities", "The relationship between risk and return for the market portfolio", "The relationship between risk and return for risk-free securities", "The relationship between risk and return for efficient portfolios"],
            correctAnswer: 1,
        },
        {
            question: "Q11. How is the Capital Market Line (CML) used in portfolio management?",
            options: ["To calculate the risk-free rate", "To select the optimal portfolio with the highest Sharpe ratio", "To predict market trends", "To evaluate company financials"],
            correctAnswer: 1,
        },
        {
            question: "Q12. What is the relationship between the Security Market Line (SML) and the Capital Market Line (CML)?",
            options: ["They are parallel lines", "They intersect at the market portfolio", "They have the same slope", "They represent the same concept"],
            correctAnswer: 1,
        },
        {
            question: "Q13. What does the slope of the Security Market Line (SML) represent?",
            options: ["The risk-free rate", "The market risk premium", "The Sharpe ratio", "The standard deviation of the market index"],
            correctAnswer: 1,
        },
        {
            question: "Q14. How does the Security Market Line (SML) differ from the Capital Market Line (CML)?",
            options: ["SML includes only risky assets, while CML includes both risky and risk-free assets", "SML represents the efficient portfolios, while CML represents all possible portfolios", "SML is a straight line, while CML is a curved line", "SML has a positive slope, while CML has a negative slope"],
            correctAnswer: 0,
        },
        {
            question: "Q15. What is the main advantage of using the Capital Market Line (CML) in portfolio management?",
            options: ["It provides a clear indication of the market risk premium", "It helps in identifying overvalued securities", "It allows for the construction of efficient portfolios", "It eliminates all risk from a portfolio"],
            correctAnswer: 2,
        },
        {
            question: "Q16. How is the risk-free rate used in the Capital Market Line (CML)?",
            options: ["To calculate the expected return of a portfolio", "To eliminate all risk from a portfolio", "To determine the market risk premium", "To evaluate company financials"],
            correctAnswer: 0,
        },
        {
            question: "Q17. What is the primary goal of the Security Market Line (SML)?",
            options: ["To determine the risk-free rate", "To identify the market risk premium", "To represent the risk-return tradeoff for efficient portfolios", "To predict market trends"],
            correctAnswer: 2,
        },
        {
            question: "Q18. How is the Security Market Line (SML) used in portfolio management?",
            options: ["To calculate the risk-free rate", "To select the optimal portfolio with the highest Sharpe ratio", "To predict market trends", "To evaluate company financials"],
            correctAnswer: 1,
        },
        {
            question: "Q19. What does the Security Market Line (SML) indicate about a security?",
            options: ["Its risk level relative to the market", "Its risk level relative to the risk-free rate", "Its expected return relative to the market", "Its expected return relative to the risk-free rate"],
            correctAnswer: 3,
        },
        {
            question: "Q20. What is the main advantage of using the Security Market Line (SML) in portfolio management?",
            options: ["It provides a clear indication of the market risk premium", "It helps in identifying overvalued securities", "It allows for the construction of efficient portfolios", "It eliminates all risk from a portfolio"],
            correctAnswer: 0,
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