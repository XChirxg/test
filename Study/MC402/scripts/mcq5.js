

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
            question: "Q1. What does SCBA stand for?",
            options: ["Social Cost Benefit Appraisal", "Standard Cost Benefit Analysis", "Social Cost Benefit Analysis", "Systematic Cost Benefit Appraisal"],
            correctAnswer: 2,
        },
        {
            question: "Q2. What is the methodology of Social Cost Benefit Analysis (SCBA)?",
            options: ["It focuses only on financial costs and benefits", "It considers both financial and social costs and benefits", "It considers only social costs and benefits", "It is not a recognized method"],
            correctAnswer: 1,
        },
        {
            question: "Q3. What are the approaches to SCBA?",
            options: ["Land and Material approach only", "United Nations Industrial Development Organization (UNIDO) approach only", "Both Land and Material approach and UNIDO approach", "There are no specific approaches"],
            correctAnswer: 2,
        },
        {
            question: "Q4. How is SCBA used in India?",
            options: ["It is not used in India", "It is used only for government projects", "It is used for evaluating public projects", "It is used for evaluating private projects"],
            correctAnswer: 2,
        },
        {
            question: "Q5. What is project implementation?",
            options: ["The process of planning a project", "The process of evaluating a project", "The process of executing a project", "The process of terminating a project"],
            correctAnswer: 2,
        },
        {
            question: "Q6. What is PERT?",
            options: ["Program Evaluation and Review Technique", "Project Evaluation and Review Technique", "Program Evaluation and Risk Technique", "Project Evaluation and Risk Technique"],
            correctAnswer: 0,
        },
        {
            question: "Q7. What is CPM?",
            options: ["Critical Planning Method", "Critical Project Method", "Critical Path Management", "Critical Path Method"],
            correctAnswer: 3,
        },
        {
            question: "Q8. What is a common problem in project implementation?",
            options: ["Underestimation of time and cost", "Overestimation of time and cost", "Accurate estimation of time and cost", "No estimation of time and cost"],
            correctAnswer: 0,
        },
        {
            question: "Q9. What are project implementation practices in India?",
            options: ["They are not well-established", "They are only established in government projects", "They are well-established in both government and private projects", "There are no specific practices"],
            correctAnswer: 2,
        },
        {
            question: "Q10. What is project review/control?",
            options: ["It is the process of starting a project", "It is the process of evaluating a project after completion", "It is the process of monitoring and controlling a project", "It is the process of terminating a project"],
            correctAnswer: 2,
        },
        {
            question: "Q11. What does SCBA stand for?",
            options: ["Social Cost Benefit Appraisal", "Standard Cost Benefit Analysis", "Social Cost Benefit Analysis", "Systematic Cost Benefit Appraisal"],
            correctAnswer: 2,
        },
        {
            question: "Q12. What is the methodology of Social Cost Benefit Analysis (SCBA)?",
            options: ["It focuses only on financial costs and benefits", "It considers both financial and social costs and benefits", "It considers only social costs and benefits", "It is not a recognized method"],
            correctAnswer: 1,
        },
        {
            question: "Q13. What are the approaches to SCBA?",
            options: ["Land and Material approach only", "United Nations Industrial Development Organization (UNIDO) approach only", "Both Land and Material approach and UNIDO approach", "There are no specific approaches"],
            correctAnswer: 2,
        },
        {
            question: "Q14. How is SCBA used in India?",
            options: ["It is not used in India", "It is used only for government projects", "It is used for evaluating public projects", "It is used for evaluating private projects"],
            correctAnswer: 2,
        },
        {
            question: "Q15. What is project implementation?",
            options: ["The process of planning a project", "The process of evaluating a project", "The process of executing a project", "The process of terminating a project"],
            correctAnswer: 2,
        },
        {
            question: "Q16. What is PERT?",
            options: ["Program Evaluation and Review Technique", "Project Evaluation and Review Technique", "Program Evaluation and Risk Technique", "Project Evaluation and Risk Technique"],
            correctAnswer: 0,
        },
        {
            question: "Q17. What is CPM?",
            options: ["Critical Planning Method", "Critical Project Method", "Critical Path Management", "Critical Path Method"],
            correctAnswer: 3,
        },
        {
            question: "Q18. What is a common problem in project implementation?",
            options: ["Underestimation of time and cost", "Overestimation of time and cost", "Accurate estimation of time and cost", "No estimation of time and cost"],
            correctAnswer: 0,
        },
        {
            question: "Q19. What are project implementation practices in India?",
            options: ["They are not well-established", "They are only established in government projects", "They are well-established in both government and private projects", "There are no specific practices"],
            correctAnswer: 2,
        },
        {
            question: "Q20. What is project review/control?",
            options: ["It is the process of starting a project", "It is the process of evaluating a project after completion", "It is the process of monitoring and controlling a project", "It is the process of terminating a project"],
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