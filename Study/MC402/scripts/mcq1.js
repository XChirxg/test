

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
            question: "Q1. What is entrepreneurship?",
            options: ["A type of business organization", "The process of starting and running a business", "The study of market trends", "A government initiative"],
            correctAnswer: 1,
        },
        {
            question: "Q2. What is the role of entrepreneurship in economic development?",
            options: ["It has no impact on economic development", "It leads to unemployment", "It creates jobs and drives innovation", "It increases government spending"],
            correctAnswer: 2,
        },
        {
            question: "Q3. Which of the following factors impacts the emergence of entrepreneurship?",
            options: ["Government regulations", "Stagnant economy", "Lack of resources", "Lack of entrepreneurial skills"],
            correctAnswer: 0,
        },
        {
            question: "Q4. What are the types of entrepreneurs?",
            options: ["Innovative and non-innovative", "Sole proprietorship and partnership", "Public and private", "Manufacturing and service"],
            correctAnswer: 0,
        },
        {
            question: "Q5. What are characteristics commonly found in successful entrepreneurs?",
            options: ["Reluctance to take risks", "Resistance to change", "Innovative thinking", "Dependence on others"],
            correctAnswer: 2,
        },
        {
            question: "Q6. What is the relationship between entrepreneurship development and leadership?",
            options: ["They are unrelated concepts", "Leadership is not important in entrepreneurship", "Entrepreneurship development requires effective leadership", "Leadership is only important in large corporations"],
            correctAnswer: 2,
        },
        {
            question: "Q7. What are the types of startups?",
            options: ["Tech and non-tech", "Local and international", "Profit and non-profit", "Public and private"],
            correctAnswer: 0,
        },
        {
            question: "Q8. What are entrepreneurial training programs aimed at?",
            options: ["Increasing government revenue", "Reducing competition", "Enhancing entrepreneurial skills", "Promoting large corporations"],
            correctAnswer: 2,
        },
        {
            question: "Q9. What do entrepreneurship development programs focus on?",
            options: ["Promoting unemployment", "Supporting established businesses", "Creating an entrepreneurial culture", "Discouraging innovation"],
            correctAnswer: 2,
        },
        {
            question: "Q10. What are characteristics of entrepreneurial leadership?",
            options: ["Lack of vision", "Dependency on others", "Risk aversion", "Visionary and strategic thinking"],
            correctAnswer: 3,
        },
        {
            question: "Q11. What are components of entrepreneurial leadership?",
            options: ["Resistance to change", "Lack of communication skills", "Vision, innovation, and risk-taking", "Reliance on traditional methods"],
            correctAnswer: 2,
        },
        {
            question: "Q12. What is entrepreneurship?",
            options: ["A type of business organization", "The process of starting and running a business", "The study of market trends", "A government initiative"],
            correctAnswer: 1,
        },
        {
            question: "Q13. What is the role of entrepreneurship in economic development?",
            options: ["It has no impact on economic development", "It leads to unemployment", "It creates jobs and drives innovation", "It increases government spending"],
            correctAnswer: 2,
        },
        {
            question: "Q14. Which of the following factors impacts the emergence of entrepreneurship?",
            options: ["Government regulations", "Stagnant economy", "Lack of resources", "Lack of entrepreneurial skills"],
            correctAnswer: 0,
        },
        {
            question: "Q15. What are the types of entrepreneurs?",
            options: ["Innovative and non-innovative", "Sole proprietorship and partnership", "Public and private", "Manufacturing and service"],
            correctAnswer: 0,
        },
        {
            question: "Q16. What are characteristics commonly found in successful entrepreneurs?",
            options: ["Reluctance to take risks", "Resistance to change", "Innovative thinking", "Dependence on others"],
            correctAnswer: 2,
        },
        {
            question: "Q17. What is the relationship between entrepreneurship development and leadership?",
            options: ["They are unrelated concepts", "Leadership is not important in entrepreneurship", "Entrepreneurship development requires effective leadership", "Leadership is only important in large corporations"],
            correctAnswer: 2,
        },
        {
            question: "Q18. What are the types of startups?",
            options: ["Tech and non-tech", "Local and international", "Profit and non-profit", "Public and private"],
            correctAnswer: 0,
        },
        {
            question: "Q19. What are entrepreneurial training programs aimed at?",
            options: ["Increasing government revenue", "Reducing competition", "Enhancing entrepreneurial skills", "Promoting large corporations"],
            correctAnswer: 2,
        },
        {
            question: "Q20. What do entrepreneurship development programs focus on?",
            options: ["Promoting unemployment", "Supporting established businesses", "Creating an entrepreneurial culture", "Discouraging innovation"],
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