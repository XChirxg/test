

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
            question: "Q1. What are the styles of corporate management?",
            options: ["Autocratic, democratic, and laissez-faire", "Transactional, transformational, and charismatic", "Strategic, operational, and tactical", "Authoritarian, bureaucratic, and participative"],
            correctAnswer: 0,
        },
        {
            question: "Q2. What is strategic management at the corporate level?",
            options: ["Management of day-to-day operations", "Management of long-term goals and objectives", "Management of human resources", "Management of financial resources"],
            correctAnswer: 1,
        },
        {
            question: "Q3. What is the role of general managers?",
            options: ["To focus on specific functional areas of the organization", "To oversee the entire organization or a significant part of it", "To implement strategies developed by top management", "To develop strategies for the organization"],
            correctAnswer: 1,
        },
        {
            question: "Q4. What characterized organizations in the late 1990s?",
            options: ["Rapid technological advancements", "Slow globalization", "Stagnant economic growth", "Decreasing competition"],
            correctAnswer: 0,
        },
        {
            question: "Q5. What is corporate resource planning?",
            options: ["Planning for financial resources only", "Planning for human resources only", "Planning for all organizational resources", "Planning for technological resources only"],
            correctAnswer: 2,
        },
        {
            question: "Q6. What is functional planning?",
            options: ["Planning for specific functions within an organization", "Planning for overall organizational functions", "Planning for financial functions only", "Planning for human resource functions only"],
            correctAnswer: 0,
        },
        {
            question: "Q7. What are policies in strategic resource management?",
            options: ["Broad guidelines for decision-making", "Specific rules and regulations", "Operational procedures", "Budgetary allocations"],
            correctAnswer: 0,
        },
        {
            question: "Q8. What are procedures in strategic resource management?",
            options: ["Broad guidelines for decision-making", "Specific rules and regulations", "Operational procedures", "Budgetary allocations"],
            correctAnswer: 2,
        },
        {
            question: "Q9. What are plans in strategic resource management?",
            options: ["Broad guidelines for decision-making", "Specific rules and regulations", "Operational procedures", "Budgetary allocations"],
            correctAnswer: 3,
        },
        {
            question: "Q10. What is crisis avoidance and management?",
            options: ["Avoiding crises before they occur and managing them effectively if they do occur", "Ignoring crises until they become unmanageable", "Creating crises to test the organization's resilience", "Managing crises after they occur"],
            correctAnswer: 0,
        },
        {
            question: "Q11. What are issues in the management of change?",
            options: ["Resistance from employees", "Lack of vision from top management", "Inadequate resources", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q12. What are strategies for implementation and change?",
            options: ["Communicating clearly and regularly", "Involving employees in the change process", "Providing training and support", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q13. What is power in the context of strategic change management?",
            options: ["The ability to influence others", "The ability to control resources", "The ability to make decisions", "All of the above"],
            correctAnswer: 3,
        },
        {
            question: "Q14. What are politics in the context of strategic change management?",
            options: ["The use of power to achieve personal or organizational goals", "The use of influence to achieve personal goals", "The use of resources to achieve organizational goals", "The use of decision-making to achieve personal or organizational goals"],
            correctAnswer: 0,
        },
        {
            question: "Q15. What are the styles of corporate management?",
            options: ["Autocratic, democratic, and laissez-faire", "Transactional, transformational, and charismatic", "Strategic, operational, and tactical", "Authoritarian, bureaucratic, and participative"],
            correctAnswer: 0,
        },
        {
            question: "Q16. What is strategic management at the corporate level?",
            options: ["Management of day-to-day operations", "Management of long-term goals and objectives", "Management of human resources", "Management of financial resources"],
            correctAnswer: 1,
        },
        {
            question: "Q17. What is the role of general managers?",
            options: ["To focus on specific functional areas of the organization", "To oversee the entire organization or a significant part of it", "To implement strategies developed by top management", "To develop strategies for the organization"],
            correctAnswer: 1,
        },
        {
            question: "Q18. What characterized organizations in the late 1990s?",
            options: ["Rapid technological advancements", "Slow globalization", "Stagnant economic growth", "Decreasing competition"],
            correctAnswer: 0,
        },
        {
            question: "Q19. What is corporate resource planning?",
            options: ["Planning for financial resources only", "Planning for human resources only", "Planning for all organizational resources", "Planning for technological resources only"],
            correctAnswer: 2,
        },
        {
            question: "Q20. What is functional planning?",
            options: ["Planning for specific functions within an organization", "Planning for overall organizational functions", "Planning for financial functions only", "Planning for human resource functions only"],
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