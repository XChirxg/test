

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
            question: "Q1. How can financing contribute to competitive advantage?",
            options: ["By increasing costs", "By decreasing access to capital", "By providing resources for growth and innovation", "By limiting expansion opportunities"],
            correctAnswer: 2,
        },
        {
            question: "Q2. What is the strategic information challenge?",
            options: ["The challenge of managing information systems", "The challenge of using information to gain competitive advantage", "The challenge of securing information", "The challenge of accessing information"],
            correctAnswer: 1,
        },
        {
            question: "Q3. What is the role of information technology in achieving competitive advantage?",
            options: ["To increase costs", "To decrease innovation", "To increase product differentiation", "To decrease market share"],
            correctAnswer: 2,
        },
        {
            question: "Q4. What is strategy formulation?",
            options: ["The process of developing strategies to achieve goals", "The process of analyzing the external environment", "The process of setting organizational goals", "The process of implementing strategies"],
            correctAnswer: 0,
        },
        {
            question: "Q5. What is strategic planning?",
            options: ["The process of developing strategies to achieve goals", "The process of analyzing the external environment", "The process of setting organizational goals", "The process of implementing strategies"],
            correctAnswer: 2,
        },
        {
            question: "Q6. What are strategic planning techniques?",
            options: ["Techniques for analyzing the external environment", "Techniques for setting organizational goals", "Techniques for developing strategies", "Techniques for implementing strategies"],
            correctAnswer: 2,
        },
        {
            question: "Q7. What are strategic alternatives?",
            options: ["Alternative strategies for achieving goals", "Alternative goals for an organization", "Alternative industries for expansion", "Alternative products for development"],
            correctAnswer: 0,
        },
        {
            question: "Q8. What are market entry strategies?",
            options: ["Strategies for exiting a market", "Strategies for entering a new market", "Strategies for expanding market share", "Strategies for competing in a market"],
            correctAnswer: 1,
        },
        {
            question: "Q9. What are disinvestment strategies?",
            options: ["Strategies for investing in new markets", "Strategies for exiting current markets", "Strategies for increasing market share", "Strategies for diversifying products"],
            correctAnswer: 1,
        },
        {
            question: "Q10. What are international strategies?",
            options: ["Strategies for entering new markets", "Strategies for competing in existing markets", "Strategies for exiting markets", "Strategies for diversifying products"],
            correctAnswer: 0,
        },
        {
            question: "Q11. What is strategic growth?",
            options: ["The process of increasing market share", "The process of expanding into new markets", "The process of growing the organization", "The process of acquiring new businesses"],
            correctAnswer: 2,
        },
        {
            question: "Q12. What is diversification?",
            options: ["The process of expanding into new markets", "The process of acquiring new businesses", "The process of increasing market share", "The process of focusing on core competencies"],
            correctAnswer: 0,
        },
        {
            question: "Q13. What are acquisition strategies?",
            options: ["Strategies for acquiring new customers", "Strategies for acquiring new businesses", "Strategies for acquiring new products", "Strategies for acquiring new markets"],
            correctAnswer: 1,
        },
        {
            question: "Q14. What are joint ventures?",
            options: ["Partnerships between two or more companies to pursue a specific project or business opportunity", "Partnerships between companies and governments", "Partnerships between companies and non-profit organizations", "Partnerships between companies and customers"],
            correctAnswer: 0,
        },
        {
            question: "Q15. What are strategic alliances?",
            options: ["Alliances between companies and governments", "Alliances between companies and non-profit organizations", "Alliances between companies and customers", "Alliances between two or more companies to pursue a common goal"],
            correctAnswer: 3,
        },
        {
            question: "Q16. What is strategic consolidation?",
            options: ["The process of consolidating market share", "The process of consolidating financial resources", "The process of consolidating operations", "The process of consolidating strategic alliances"],
            correctAnswer: 2,
        },
        {
            question: "Q17. What is strategic recovery?",
            options: ["The process of recovering from a decline in performance", "The process of recovering lost market share", "The process of recovering from a recession", "The process of recovering from a disaster"],
            correctAnswer: 0,
        },
        {
            question: "Q18. What are retrenchment strategies?",
            options: ["Strategies for increasing market share", "Strategies for reducing costs and improving efficiency", "Strategies for expanding into new markets", "Strategies for diversifying products"],
            correctAnswer: 1,
        },
        {
            question: "Q19. What are turnaround strategies?",
            options: ["Strategies for exiting a market", "Strategies for turning around declining performance", "Strategies for entering a new market", "Strategies for competing in a market"],
            correctAnswer: 1,
        },
        {
            question: "Q20. What is a management buyout?",
            options: ["A strategy for acquiring new customers", "A strategy for acquiring a competitor", "A strategy for acquiring a new product", "A strategy for acquiring a company from its owners"],
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