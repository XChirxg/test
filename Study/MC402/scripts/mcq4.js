

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
            question: "Q1. What does the cost of a project include?",
            options: ["Only the initial investment", "Only the operating costs", "Both the initial investment and operating costs", "None of the above"],
            correctAnswer: 2,
        },
        {
            question: "Q2. How is the cost of a project financed?",
            options: ["Through equity financing only", "Through debt financing only", "Through a combination of equity and debt financing", "Through government grants only"],
            correctAnswer: 2,
        },
        {
            question: "Q3. What are the major cost components of a project?",
            options: ["Fixed costs only", "Variable costs only", "Both fixed and variable costs", "Sunk costs only"],
            correctAnswer: 2,
        },
        {
            question: "Q4. What is capital structure planning?",
            options: ["Planning the physical layout of the plant", "Planning the financing mix of debt and equity", "Planning the production process", "Planning the marketing strategy"],
            correctAnswer: 1,
        },
        {
            question: "Q5. What are the financing schemes offered by financial institutions?",
            options: ["Equity financing only", "Debt financing only", "Lease financing only", "A combination of equity, debt, and lease financing"],
            correctAnswer: 3,
        },
        {
            question: "Q6. What does the cost of a project include?",
            options: ["Only the initial investment", "Only the operating costs", "Both the initial investment and operating costs", "None of the above"],
            correctAnswer: 2,
        },
        {
            question: "Q7. How is the cost of a project financed?",
            options: ["Through equity financing only", "Through debt financing only", "Through a combination of equity and debt financing", "Through government grants only"],
            correctAnswer: 2,
        },
        {
            question: "Q8. What are the major cost components of a project?",
            options: ["Fixed costs only", "Variable costs only", "Both fixed and variable costs", "Sunk costs only"],
            correctAnswer: 2,
        },
        {
            question: "Q9. What is capital structure planning?",
            options: ["Planning the physical layout of the plant", "Planning the financing mix of debt and equity", "Planning the production process", "Planning the marketing strategy"],
            correctAnswer: 1,
        },
        {
            question: "Q10. What are the financing schemes offered by financial institutions?",
            options: ["Equity financing only", "Debt financing only", "Lease financing only", "A combination of equity, debt, and lease financing"],
            correctAnswer: 3,
        },
        {
            question: "Q11. What does the cost of a project include?",
            options: ["Only the initial investment", "Only the operating costs", "Both the initial investment and operating costs", "None of the above"],
            correctAnswer: 2,
        },
        {
            question: "Q12. How is the cost of a project financed?",
            options: ["Through equity financing only", "Through debt financing only", "Through a combination of equity and debt financing", "Through government grants only"],
            correctAnswer: 2,
        },
        {
            question: "Q13. What are the major cost components of a project?",
            options: ["Fixed costs only", "Variable costs only", "Both fixed and variable costs", "Sunk costs only"],
            correctAnswer: 2,
        },
        {
            question: "Q14. What is capital structure planning?",
            options: ["Planning the physical layout of the plant", "Planning the financing mix of debt and equity", "Planning the production process", "Planning the marketing strategy"],
            correctAnswer: 1,
        },
        {
            question: "Q15. What are the financing schemes offered by financial institutions?",
            options: ["Equity financing only", "Debt financing only", "Lease financing only", "A combination of equity, debt, and lease financing"],
            correctAnswer: 3,
        },
        {
            question: "Q16. What does the cost of a project include?",
            options: ["Only the initial investment", "Only the operating costs", "Both the initial investment and operating costs", "None of the above"],
            correctAnswer: 2,
        },
        {
            question: "Q17. How is the cost of a project financed?",
            options: ["Through equity financing only", "Through debt financing only", "Through a combination of equity and debt financing", "Through government grants only"],
            correctAnswer: 2,
        },
        {
            question: "Q18. What are the major cost components of a project?",
            options: ["Fixed costs only", "Variable costs only", "Both fixed and variable costs", "Sunk costs only"],
            correctAnswer: 2,
        },
        {
            question: "Q19. What is capital structure planning?",
            options: ["Planning the physical layout of the plant", "Planning the financing mix of debt and equity", "Planning the production process", "Planning the marketing strategy"],
            correctAnswer: 1,
        },
        {
            question: "Q20. What are the financing schemes offered by financial institutions?",
            options: ["Equity financing only", "Debt financing only", "Lease financing only", "A combination of equity, debt, and lease financing"],
            correctAnswer: 3,
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