

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
            question: "Q1. What does the Arbitrage Pricing Theory (APT) suggest about asset pricing?",
            options: ["Assets are always priced correctly", "Assets are sometimes mispriced", "Assets are always mispriced", "Asset pricing is random"],
            correctAnswer: 1,
        },
        {
            question: "Q2. What is the primary assumption of the Arbitrage Pricing Theory (APT)?",
            options: ["Investors are risk-averse", "Markets are inefficient", "There are no arbitrage opportunities", "Asset prices follow a random walk"],
            correctAnswer: 2,
        },
        {
            question: "Q3. What is the key concept behind the Arbitrage Pricing Theory (APT)?",
            options: ["The law of one price", "The principle of risk-return tradeoff", "The absence of arbitrage opportunities", "The efficient market hypothesis"],
            correctAnswer: 2,
        },
        {
            question: "Q4. How are two-factor and multi-factor models different from the Capital Asset Pricing Model (CAPM)?",
            options: ["They use different risk measures", "They include more factors than just market risk", "They assume all investors are risk-averse", "They are based on different assumptions about market efficiency"],
            correctAnswer: 1,
        },
        {
            question: "Q5. What is the main advantage of using a multi-factor model over a single-factor model?",
            options: ["It is simpler to implement", "It provides a more comprehensive view of risk", "It guarantees higher returns", "It eliminates all risk from a portfolio"],
            correctAnswer: 1,
        },
        {
            question: "Q6. What is the Principle of Arbitrage?",
            options: ["The idea that assets should be priced based on their intrinsic value", "The idea that riskier assets should have higher returns", "The idea that mispriced assets can be exploited for profit", "The idea that markets are always efficient"],
            correctAnswer: 2,
        },
        {
            question: "Q7. How are arbitrage portfolios constructed?",
            options: ["By combining assets in a way that eliminates risk", "By buying undervalued assets and selling overvalued assets", "By diversifying across multiple asset classes", "By investing in high-risk, high-return assets"],
            correctAnswer: 1,
        },
        {
            question: "Q8. Which of the following is NOT an assumption of the Arbitrage Pricing Theory (APT)?",
            options: ["Investors are rational", "Markets are efficient", "There are no transaction costs", "There are no arbitrage opportunities"],
            correctAnswer: 1,
        },
        {
            question: "Q9. How does the Arbitrage Pricing Theory (APT) differ from the Capital Asset Pricing Model (CAPM)?",
            options: ["APT considers multiple factors affecting asset prices, while CAPM considers only market risk", "APT assumes all investors are risk-averse, while CAPM does not", "APT is based on the principle of arbitrage, while CAPM is based on the efficient market hypothesis", "APT is a single-factor model, while CAPM is a multi-factor model"],
            correctAnswer: 0,
        },
        {
            question: "Q10. What does the Arbitrage Pricing Theory (APT) suggest about the relationship between risk and return?",
            options: ["There is no relationship between risk and return", "There is a linear relationship between risk and return", "There is a non-linear relationship between risk and return", "There is an inverse relationship between risk and return"],
            correctAnswer: 1,
        },
        {
            question: "Q11. How are two-factor and multi-factor models different from the Capital Asset Pricing Model (CAPM)?",
            options: ["They use different risk measures", "They include more factors than just market risk", "They assume all investors are risk-averse", "They are based on different assumptions about market efficiency"],
            correctAnswer: 1,
        },
        {
            question: "Q12. What is the main advantage of using a multi-factor model over a single-factor model?",
            options: ["It is simpler to implement", "It provides a more comprehensive view of risk", "It guarantees higher returns", "It eliminates all risk from a portfolio"],
            correctAnswer: 1,
        },
        {
            question: "Q13. What is the Principle of Arbitrage?",
            options: ["The idea that assets should be priced based on their intrinsic value", "The idea that riskier assets should have higher returns", "The idea that mispriced assets can be exploited for profit", "The idea that markets are always efficient"],
            correctAnswer: 2,
        },
        {
            question: "Q14. How are arbitrage portfolios constructed?",
            options: ["By combining assets in a way that eliminates risk", "By buying undervalued assets and selling overvalued assets", "By diversifying across multiple asset classes", "By investing in high-risk, high-return assets"],
            correctAnswer: 1,
        },
        {
            question: "Q15. Which of the following is NOT an assumption of the Arbitrage Pricing Theory (APT)?",
            options: ["Investors are rational", "Markets are efficient", "There are no transaction costs", "There are no arbitrage opportunities"],
            correctAnswer: 1,
        },
        {
            question: "Q16. How does the Arbitrage Pricing Theory (APT) differ from the Capital Asset Pricing Model (CAPM)?",
            options: ["APT considers multiple factors affecting asset prices, while CAPM considers only market risk", "APT assumes all investors are risk-averse, while CAPM does not", "APT is based on the principle of arbitrage, while CAPM is based on the efficient market hypothesis", "APT is a single-factor model, while CAPM is a multi-factor model"],
            correctAnswer: 0,
        },
        {
            question: "Q17. What does the Arbitrage Pricing Theory (APT) suggest about the relationship between risk and return?",
            options: ["There is no relationship between risk and return", "There is a linear relationship between risk and return", "There is a non-linear relationship between risk and return", "There is an inverse relationship between risk and return"],
            correctAnswer: 1,
        },
        {
            question: "Q18. What is the main advantage of using a multi-factor model over a single-factor model?",
            options: ["It is simpler to implement", "It provides a more comprehensive view of risk", "It guarantees higher returns", "It eliminates all risk from a portfolio"],
            correctAnswer: 1,
        },
        {
            question: "Q19. What is the Principle of Arbitrage?",
            options: ["The idea that assets should be priced based on their intrinsic value", "The idea that riskier assets should have higher returns", "The idea that mispriced assets can be exploited for profit", "The idea that markets are always efficient"],
            correctAnswer: 2,
        },
        {
            question: "Q20. How are arbitrage portfolios constructed?",
            options: ["By combining assets in a way that eliminates risk", "By buying undervalued assets and selling overvalued assets", "By diversifying across multiple asset classes", "By investing in high-risk, high-return assets"],
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