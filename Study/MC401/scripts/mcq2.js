

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
            question: "Q1. What is the primary focus of fundamental analysis?",
            options: ["Market trends", "Company's financials and management", "Price charts and patterns", "Market efficiency"],
            correctAnswer: 1,
        },
        {
            question: "Q2. Which of the following is NOT a tool used in fundamental analysis?",
            options: ["Income statement analysis", "Technical indicators", "Balance sheet analysis", "Cash flow statement analysis"],
            correctAnswer: 1,
        },
        {
            question: "Q3. What is the goal of technical analysis?",
            options: ["To analyze company financials", "To predict future price movements based on past data", "To understand market trends", "To evaluate market efficiency"],
            correctAnswer: 1,
        },
        {
            question: "Q4. Which of the following is a key assumption of the efficient market hypothesis?",
            options: ["Investors always act rationally", "Market prices reflect all available information", "Past price movements can predict future price movements", "Markets are always in equilibrium"],
            correctAnswer: 1,
        },
        {
            question: "Q5. What does fundamental analysis primarily use to evaluate a stock?",
            options: ["Price charts", "Technical indicators", "Company financials", "Market trends"],
            correctAnswer: 2,
        },
        {
            question: "Q6. Which of the following statements is true about fundamental analysis?",
            options: ["It relies heavily on historical price data", "It is used to predict short-term price movements", "It focuses on the intrinsic value of a security", "It ignores company financials"],
            correctAnswer: 2,
        },
        {
            question: "Q7. What is a technical indicator used for in technical analysis?",
            options: ["To analyze company financial statements", "To predict future price movements", "To understand market trends", "To evaluate market efficiency"],
            correctAnswer: 1,
        },
        {
            question: "Q8. According to the efficient market hypothesis, what happens if a stock is undervalued?",
            options: ["It will be overbought", "It will be underbought", "It will be accurately priced", "It will be overvalued"],
            correctAnswer: 3,
        },
        {
            question: "Q9. Which form of market efficiency suggests that all historical prices are fully reflected in current market prices?",
            options: ["Weak form", "Semi-strong form", "Strong form", "None of the above"],
            correctAnswer: 0,
        },
        {
            question: "Q10. What is the goal of fundamental analysis?",
            options: ["To predict short-term price movements", "To analyze price charts and patterns", "To evaluate a company's intrinsic value", "To understand market trends"],
            correctAnswer: 2,
        },
        {
            question: "Q11. Which of the following is NOT a component of fundamental analysis?",
            options: ["Balance sheet analysis", "Income statement analysis", "Technical indicator analysis", "Cash flow statement analysis"],
            correctAnswer: 2,
        },
        {
            question: "Q12. What does technical analysis primarily use to predict future price movements?",
            options: ["Company financial statements", "Historical price and volume data", "Market trends", "Fundamental ratios"],
            correctAnswer: 1,
        },
        {
            question: "Q13. Which of the following is a key principle of the efficient market hypothesis?",
            options: ["Investors always act rationally", "Market prices reflect all available information", "Past price movements can predict future price movements", "Markets are always in equilibrium"],
            correctAnswer: 1,
        },
        {
            question: "Q14. What is the main focus of technical analysis?",
            options: ["Market trends", "Company's financials and management", "Price charts and patterns", "Market efficiency"],
            correctAnswer: 2,
        },
        {
            question: "Q15. Which of the following statements is true about technical analysis?",
            options: ["It relies heavily on company financial statements", "It is used to predict long-term price movements", "It focuses on market trends and psychology", "It ignores past price data"],
            correctAnswer: 2,
        },
        {
            question: "Q16. What is a key assumption of the efficient market hypothesis?",
            options: ["Investors always act irrationally", "Market prices do not reflect all available information", "Past price movements can reliably predict future price movements", "Markets are not always in equilibrium"],
            correctAnswer: 1,
        },
        {
            question: "Q17. Which of the following is NOT a tool used in technical analysis?",
            options: ["Moving averages", "Relative strength index (RSI)", "MACD histogram", "Income statement analysis"],
            correctAnswer: 3,
        },
        {
            question: "Q18. What does the efficient market hypothesis suggest about the possibility of consistently beating the market?",
            options: ["It is possible with the right strategy", "It is impossible due to market efficiency", "It is possible with luck", "It is possible with insider information"],
            correctAnswer: 1,
        },
        {
            question: "Q19. Which form of market efficiency suggests that all public information is fully reflected in current market prices?",
            options: ["Weak form", "Semi-strong form", "Strong form", "None of the above"],
            correctAnswer: 1,
        },
        {
            question: "Q20. What is the goal of technical analysis?",
            options: ["To analyze price charts and patterns", "To evaluate a company's intrinsic value", "To predict short-term price movements", "To understand market trends"],
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