

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
            question: "Q1. What is the purpose of an organizational mission?",
            options: ["To provide a strategic framework for decision-making", "To define the organization's purpose and direction", "To establish financial goals", "To predict company failure"],
            correctAnswer: 1,
        },
        {
            question: "Q2. What is the difference between vision and mission?",
            options: ["Vision is long-term, while mission is short-term", "Vision is internal, while mission is external", "Vision is aspirational, while mission is operational", "Vision is for profit, while mission is for non-profit organizations"],
            correctAnswer: 2,
        },
        {
            question: "Q3. What is the objective of financial analysis?",
            options: ["To predict company failure", "To assess the financial health of an organization", "To determine market share", "To identify new product opportunities"],
            correctAnswer: 1,
        },
        {
            question: "Q4. What are some symptoms of company decline?",
            options: ["Decreased customer complaints", "Increased employee satisfaction", "Decreased market share", "Increased profitability"],
            correctAnswer: 2,
        },
        {
            question: "Q5. What is SWOT analysis used for?",
            options: ["To analyze the competitive environment", "To assess the organization's internal strengths and weaknesses", "To predict company failure", "To identify new product opportunities"],
            correctAnswer: 1,
        },
        {
            question: "Q6. What is the competitive environment?",
            options: ["The political and economic environment", "The social and technological environment", "The market in which a company operates", "The internal environment of a company"],
            correctAnswer: 2,
        },
        {
            question: "Q7. What is competitive advantage?",
            options: ["Having the lowest prices in the industry", "Offering unique products or services", "Being the largest company in the industry", "Having the most employees"],
            correctAnswer: 1,
        },
        {
            question: "Q8. How can organizations achieve competitive advantage through products?",
            options: ["By offering unique products", "By having the highest prices in the industry", "By having the largest product line", "By having the most employees"],
            correctAnswer: 0,
        },
        {
            question: "Q9. What is the value chain?",
            options: ["The chain of command in an organization", "The process of adding value to products or services", "The chain of suppliers and distributors", "The chain of customer service"],
            correctAnswer: 1,
        },
        {
            question: "Q10. What is the role of marketing strategy in achieving competitive advantage?",
            options: ["To increase prices", "To decrease advertising", "To differentiate products or services", "To decrease market share"],
            correctAnswer: 2,
        },
        {
            question: "Q11. What is the purpose of research and development in achieving competitive advantage?",
            options: ["To increase costs", "To decrease innovation", "To increase product differentiation", "To decrease market share"],
            correctAnswer: 2,
        },
        {
            question: "Q12. How does speed contribute to competitive advantage?",
            options: ["By increasing costs", "By decreasing product development time", "By decreasing customer satisfaction", "By increasing market share"],
            correctAnswer: 1,
        },
        {
            question: "Q13. What is operations management?",
            options: ["The management of product development", "The management of manufacturing processes", "The management of customer service", "The management of marketing"],
            correctAnswer: 1,
        },
        {
            question: "Q14. How do service businesses achieve competitive advantage?",
            options: ["By offering lower prices", "By offering unique services", "By offering fewer services", "By offering standard services"],
            correctAnswer: 1,
        },
        {
            question: "Q15. What is total quality management?",
            options: ["A management approach that focuses on improving quality and customer satisfaction", "A management approach that focuses on increasing costs", "A management approach that focuses on decreasing innovation", "A management approach that focuses on decreasing market share"],
            correctAnswer: 0,
        },
        {
            question: "Q16. What is the purpose of an organizational mission?",
            options: ["To provide a strategic framework for decision-making", "To define the organization's purpose and direction", "To establish financial goals", "To predict company failure"],
            correctAnswer: 1,
        },
        {
            question: "Q17. What is the difference between vision and mission?",
            options: ["Vision is long-term, while mission is short-term", "Vision is internal, while mission is external", "Vision is aspirational, while mission is operational", "Vision is for profit, while mission is for non-profit organizations"],
            correctAnswer: 2,
        },
        {
            question: "Q18. What is the objective of financial analysis?",
            options: ["To predict company failure", "To assess the financial health of an organization", "To determine market share", "To identify new product opportunities"],
            correctAnswer: 1,
        },
        {
            question: "Q19. What are some symptoms of company decline?",
            options: ["Decreased customer complaints", "Increased employee satisfaction", "Decreased market share", "Increased profitability"],
            correctAnswer: 2,
        },
        {
            question: "Q20. What is SWOT analysis used for?",
            options: ["To analyze the competitive environment", "To assess the organization's internal strengths and weaknesses", "To predict company failure", "To identify new product opportunities"],
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