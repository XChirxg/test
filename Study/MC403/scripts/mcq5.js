

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
            question: "Q1. What is strategy implementation?",
            options: ["The process of formulating strategies", "The process of putting strategies into action", "The process of evaluating strategies", "The process of controlling strategies"],
            correctAnswer: 1,
        },
        {
            question: "Q2. What are the barriers to strategy implementation?",
            options: ["Lack of leadership support", "Resistance to change", "Inadequate resources", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q3. What is a model of strategy implementation?",
            options: ["A framework for implementing strategies", "A mathematical model", "A model of organizational behavior", "A model of decision-making"],
            correctAnswer: 0,
        },
        {
            question: "Q4. What is strategic budgeting?",
            options: ["Budgeting for long-term goals and objectives", "Budgeting for short-term goals and objectives", "Budgeting for financial resources only", "Budgeting for human resources only"],
            correctAnswer: 0,
        },
        {
            question: "Q5. How can resource allocation be aligned to strategy?",
            options: ["By allocating resources based on organizational goals", "By allocating resources randomly", "By allocating resources based on employee preferences", "By allocating resources based on industry trends"],
            correctAnswer: 0,
        },
        {
            question: "Q6. What factors affect resource allocation?",
            options: ["Organizational size", "Organizational structure", "Organizational culture", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q7. What are the difficulties in resource allocation?",
            options: ["Limited resources", "Uncertain environment", "Competitive pressures", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q8. What is strategic evaluation and control?",
            options: ["The process of evaluating and controlling strategies", "The process of evaluating and controlling employees", "The process of evaluating and controlling resources", "The process of evaluating and controlling budgets"],
            correctAnswer: 0,
        },
        {
            question: "Q9. Who are the participants in strategic evaluation?",
            options: ["Top management only", "All employees", "External consultants", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q10. What are the barriers in strategic evaluation?",
            options: ["Lack of data", "Resistance to evaluation", "Inadequate resources", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q11. What are the requirements for effective evaluation?",
            options: ["Clear objectives", "Timely feedback", "Appropriate measures", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q12. What is strategic control?",
            options: ["The process of controlling strategies", "The process of controlling employees", "The process of controlling resources", "The process of controlling budgets"],
            correctAnswer: 0,
        },
        {
            question: "Q13. What is premise control?",
            options: ["Control based on assumptions and expectations", "Control based on actual performance", "Control based on historical data", "Control based on future projections"],
            correctAnswer: 0,
        },
        {
            question: "Q14. What is implementation control?",
            options: ["Control of the implementation process", "Control of the strategy itself", "Control of the organizational structure", "Control of the budgeting process"],
            correctAnswer: 0,
        },
        {
            question: "Q15. What is strategic surveillance?",
            options: ["Continuous monitoring of the external environment", "Continuous monitoring of the internal environment", "Continuous monitoring of competitors", "Continuous monitoring of customer feedback"],
            correctAnswer: 0,
        },
        {
            question: "Q16. What is special control?",
            options: ["Control of specific strategic initiatives", "Control of day-to-day operations", "Control of organizational structure", "Control of financial resources"],
            correctAnswer: 0,
        },
        {
            question: "Q17. What is operation control?",
            options: ["Control of specific strategic initiatives", "Control of day-to-day operations", "Control of organizational structure", "Control of financial resources"],
            correctAnswer: 1,
        },
        {
            question: "Q18. What are the techniques of strategic evaluation and control?",
            options: ["Benchmarking", "Balanced scorecard", "Financial analysis", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q19. What is strategy implementation?",
            options: ["The process of formulating strategies", "The process of putting strategies into action", "The process of evaluating strategies", "The process of controlling strategies"],
            correctAnswer: 1,
        },
        {
            question: "Q20. What are the barriers to strategy implementation?",
            options: ["Lack of leadership support", "Resistance to change", "Inadequate resources", "All of the above"],
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