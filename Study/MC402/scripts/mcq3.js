

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
            question: "Q1. What are the sources of information for market analysis?",
            options: ["Primary sources only", "Secondary sources only", "Primary and secondary sources", "Tertiary sources"],
            correctAnswer: 2,
        },
        {
            question: "Q2. What is demand forecasting?",
            options: ["Predicting future demand for a product or service", "Analyzing current demand for a product or service", "Estimating past demand for a product or service", "Determining the supply of a product or service"],
            correctAnswer: 0,
        },
        {
            question: "Q3. What is market planning?",
            options: ["Planning the production process", "Planning the marketing strategy", "Planning the distribution channels", "Planning the pricing strategy"],
            correctAnswer: 1,
        },
        {
            question: "Q4. What is technical analysis?",
            options: ["Analyzing market trends and patterns", "Analyzing the technical aspects of a product or service", "Analyzing the financial statements of a company", "Analyzing consumer behavior"],
            correctAnswer: 1,
        },
        {
            question: "Q5. What does production technology refer to?",
            options: ["The technology used in marketing products", "The technology used in manufacturing products", "The technology used in financial analysis", "The technology used in human resource management"],
            correctAnswer: 1,
        },
        {
            question: "Q6. What is product mix?",
            options: ["The range of products offered by a company", "The production process of a product", "The distribution channels of a product", "The pricing strategy of a product"],
            correctAnswer: 0,
        },
        {
            question: "Q7. Why is plant location important?",
            options: ["It affects the cost of production", "It affects the quality of the product", "It affects the marketing strategy", "It affects the distribution channels"],
            correctAnswer: 0,
        },
        {
            question: "Q8. What is the selection of plant and equipment based on?",
            options: ["Cost only", "Quality only", "Cost and quality", "Availability only"],
            correctAnswer: 2,
        },
        {
            question: "Q9. What are the sources of information for market analysis?",
            options: ["Primary sources only", "Secondary sources only", "Primary and secondary sources", "Tertiary sources"],
            correctAnswer: 2,
        },
        {
            question: "Q10. What is demand forecasting?",
            options: ["Predicting future demand for a product or service", "Analyzing current demand for a product or service", "Estimating past demand for a product or service", "Determining the supply of a product or service"],
            correctAnswer: 0,
        },
        {
            question: "Q11. What is market planning?",
            options: ["Planning the production process", "Planning the marketing strategy", "Planning the distribution channels", "Planning the pricing strategy"],
            correctAnswer: 1,
        },
        {
            question: "Q12. What is technical analysis?",
            options: ["Analyzing market trends and patterns", "Analyzing the technical aspects of a product or service", "Analyzing the financial statements of a company", "Analyzing consumer behavior"],
            correctAnswer: 1,
        },
        {
            question: "Q13. What does production technology refer to?",
            options: ["The technology used in marketing products", "The technology used in manufacturing products", "The technology used in financial analysis", "The technology used in human resource management"],
            correctAnswer: 1,
        },
        {
            question: "Q14. What is product mix?",
            options: ["The range of products offered by a company", "The production process of a product", "The distribution channels of a product", "The pricing strategy of a product"],
            correctAnswer: 0,
        },
        {
            question: "Q15. Why is plant location important?",
            options: ["It affects the cost of production", "It affects the quality of the product", "It affects the marketing strategy", "It affects the distribution channels"],
            correctAnswer: 0,
        },
        {
            question: "Q16. What is the selection of plant and equipment based on?",
            options: ["Cost only", "Quality only", "Cost and quality", "Availability only"],
            correctAnswer: 2,
        },
        {
            question: "Q17. What are the sources of information for market analysis?",
            options: ["Primary sources only", "Secondary sources only", "Primary and secondary sources", "Tertiary sources"],
            correctAnswer: 2,
        },
        {
            question: "Q18. What is demand forecasting?",
            options: ["Predicting future demand for a product or service", "Analyzing current demand for a product or service", "Estimating past demand for a product or service", "Determining the supply of a product or service"],
            correctAnswer: 0,
        },
        {
            question: "Q19. What is market planning?",
            options: ["Planning the production process", "Planning the marketing strategy", "Planning the distribution channels", "Planning the pricing strategy"],
            correctAnswer: 1,
        },
        {
            question: "Q20. What is technical analysis?",
            options: ["Analyzing market trends and patterns", "Analyzing the technical aspects of a product or service", "Analyzing the financial statements of a company", "Analyzing consumer behavior"],
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