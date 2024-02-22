

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
            question: "Q1. What is the meaning of strategic management?",
            options: ["It is the management of day-to-day operations", "It is the management of long-term goals and objectives", "It is the management of human resources", "It is the management of financial resources"],
            correctAnswer: 1,
        },
        {
            question: "Q2. At which level does strategy operate?",
            options: ["Operational level", "Tactical level", "Strategic level", "Functional level"],
            correctAnswer: 2,
        },
        {
            question: "Q3. What are the essentials of the strategic management process?",
            options: ["Strategic planning and implementation", "Environmental analysis and decision-making", "Setting goals and objectives", "Monitoring and evaluating performance"],
            correctAnswer: 0,
        },
        {
            question: "Q4. What is EV-R Congruence in strategic management?",
            options: ["It is a model for environmental analysis", "It is a model for organizational change", "It is a model for strategic alignment", "It is a model for decision-making"],
            correctAnswer: 2,
        },
        {
            question: "Q5. What is strategic leadership?",
            options: ["It is the ability to set and achieve strategic goals", "It is the ability to influence others to achieve strategic goals", "It is the ability to make strategic decisions", "It is the ability to create strategic plans"],
            correctAnswer: 1,
        },
        {
            question: "Q6. What is the genesis of strategic management and business policy?",
            options: ["The need for long-term planning in organizations", "The need to adapt to changing environments", "The need for competitive advantage", "The need for effective decision-making"],
            correctAnswer: 0,
        },
        {
            question: "Q7. What is strategy formulation?",
            options: ["It is the process of analyzing the external environment", "It is the process of setting organizational goals", "It is the process of developing strategies to achieve goals", "It is the process of implementing strategies"],
            correctAnswer: 2,
        },
        {
            question: "Q8. What is environmental appraisal in strategy formulation?",
            options: ["It is the analysis of the internal strengths and weaknesses of an organization", "It is the analysis of the external opportunities and threats facing an organization", "It is the identification of organizational goals", "It is the implementation of strategies"],
            correctAnswer: 1,
        },
        {
            question: "Q9. What is organizational appraisal in strategy formulation?",
            options: ["It is the analysis of the external environment", "It is the analysis of the internal strengths and weaknesses of an organization", "It is the identification of organizational goals", "It is the implementation of strategies"],
            correctAnswer: 1,
        },
        {
            question: "Q10. What are corporate level strategies?",
            options: ["Strategies that focus on the overall direction of the organization", "Strategies that focus on individual business units", "Strategies that focus on functional areas of the organization", "Strategies that focus on specific projects"],
            correctAnswer: 0,
        },
        {
            question: "Q11. What is the meaning of strategic management?",
            options: ["It is the management of day-to-day operations", "It is the management of long-term goals and objectives", "It is the management of human resources", "It is the management of financial resources"],
            correctAnswer: 1,
        },
        {
            question: "Q12. At which level does strategy operate?",
            options: ["Operational level", "Tactical level", "Strategic level", "Functional level"],
            correctAnswer: 2,
        },
        {
            question: "Q13. What are the essentials of the strategic management process?",
            options: ["Strategic planning and implementation", "Environmental analysis and decision-making", "Setting goals and objectives", "Monitoring and evaluating performance"],
            correctAnswer: 0,
        },
        {
            question: "Q14. What is EV-R Congruence in strategic management?",
            options: ["It is a model for environmental analysis", "It is a model for organizational change", "It is a model for strategic alignment", "It is a model for decision-making"],
            correctAnswer: 2,
        },
        {
            question: "Q15. What is strategic leadership?",
            options: ["It is the ability to set and achieve strategic goals", "It is the ability to influence others to achieve strategic goals", "It is the ability to make strategic decisions", "It is the ability to create strategic plans"],
            correctAnswer: 1,
        },
        {
            question: "Q16. What is the genesis of strategic management and business policy?",
            options: ["The need for long-term planning in organizations", "The need to adapt to changing environments", "The need for competitive advantage", "The need for effective decision-making"],
            correctAnswer: 0,
        },
        {
            question: "Q17. What is strategy formulation?",
            options: ["It is the process of analyzing the external environment", "It is the process of setting organizational goals", "It is the process of developing strategies to achieve goals", "It is the process of implementing strategies"],
            correctAnswer: 2,
        },
        {
            question: "Q18. What is environmental appraisal in strategy formulation?",
            options: ["It is the analysis of the internal strengths and weaknesses of an organization", "It is the analysis of the external opportunities and threats facing an organization", "It is the identification of organizational goals", "It is the implementation of strategies"],
            correctAnswer: 1,
        },
        {
            question: "Q19. What is organizational appraisal in strategy formulation?",
            options: ["It is the analysis of the external environment", "It is the analysis of the internal strengths and weaknesses of an organization", "It is the identification of organizational goals", "It is the implementation of strategies"],
            correctAnswer: 1,
        },
        {
            question: "Q20. What are corporate level strategies?",
            options: ["Strategies that focus on the overall direction of the organization", "Strategies that focus on individual business units", "Strategies that focus on functional areas of the organization", "Strategies that focus on specific projects"],
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