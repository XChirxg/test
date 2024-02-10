

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
        question: "Q1. What is the capital of France?",
        options: ["A. London", "B. Berlin", "C. Paris", "D. Rome"],
        correctAnswer: 2, // Index of the correct option (Paris)
    },
    {
        question: "Q2. Which planet is known as the Red Planet?",
        options: ["A. Mars", "B. Venus", "C. Jupiter", "D. Saturn"],
        correctAnswer: 0, // Index of the correct option (Mars)
    },
    {
        question: "Q3. In what year did the Titanic sink?",
        options: ["A. 1905", "B. 1912", "C. 1920", "D. 1931"],
        correctAnswer: 1, // Index of the correct option (1912)
    },
    {
        question: "Q4. What is the largest mammal in the world?",
        options: ["A. Elephant", "B. Blue Whale", "C. Giraffe", "D. Gorilla"],
        correctAnswer: 1, // Index of the correct option (Blue Whale)
    },
    {
        question: "Q5. Who wrote 'Romeo and Juliet'?",
        options: ["A. Charles Dickens", "B. William Shakespeare", "C. Jane Austen", "D. Mark Twain"],
        correctAnswer: 1, // Index of the correct option (William Shakespeare)
    },
    {
        question: "Q6. What is the currency of Japan?",
        options: ["A. Yen", "B. Won", "C. Ringgit", "D. Baht"],
        correctAnswer: 0, // Index of the correct option (Yen)
    },
    {
        question: "Q7. Which gas do plants absorb from the atmosphere?",
        options: ["A. Oxygen", "B. Nitrogen", "C. Carbon Dioxide", "D. Hydrogen"],
        correctAnswer: 2, // Index of the correct option (Carbon Dioxide)
    },
    {
        question: "Q8. What is the largest ocean on Earth?",
        options: ["A. Atlantic Ocean", "B. Indian Ocean", "C. Pacific Ocean", "D. Arctic Ocean"],
        correctAnswer: 2, // Index of the correct option (Pacific Ocean)
    },
    {
        question: "Q9. Who painted the Mona Lisa?",
        options: ["A. Vincent van Gogh", "B. Pablo Picasso", "C. Leonardo da Vinci", "D. Michelangelo"],
        correctAnswer: 2, // Index of the correct option (Leonardo da Vinci)
    },
    {
        question: "Q10. Which planet is known as the 'Morning Star' or 'Evening Star'?",
        options: ["A. Mars", "B. Venus", "C. Jupiter", "D. Mercury"],
        correctAnswer: 1, // Index of the correct option (Venus)
    },
    {
        question: "Q11. What is the largest organ in the human body?",
        options: ["A. Heart", "B. Brain", "C. Liver", "D. Skin"],
        correctAnswer: 3, // Index of the correct option (Skin)
    },
    {
        question: "Q12. In what year did the Berlin Wall fall?",
        options: ["A. 1985", "B. 1989", "C. 1995", "D. 2000"],
        correctAnswer: 1, // Index of the correct option (1989)
    },
    {
        question: "Q13. Who wrote 'To Kill a Mockingbird'?",
        options: ["A. J.K. Rowling", "B. Harper Lee", "C. George Orwell", "D. Ernest Hemingway"],
        correctAnswer: 1, // Index of the correct option (Harper Lee)
    },
    {
        question: "Q14. What is the world's largest desert?",
        options: ["A. Sahara Desert", "B. Gobi Desert", "C. Antarctic Desert", "D. Arctic Desert"],
        correctAnswer: 2, // Index of the correct option (Antarctic Desert)
    },
    {
        question: "Q15. Who is known as the 'Father of Computers'?",
        options: ["A. Alan Turing", "B. Charles Babbage", "C. Bill Gates", "D. Steve Jobs"],
        correctAnswer: 1, // Index of the correct option (Charles Babbage)
    },
    {
        question: "Q16. What is the chemical symbol for gold?",
        options: ["A. Au", "B. Ag", "C. Fe", "D. Cu"],
        correctAnswer: 0, // Index of the correct option (Au)
    },
    {
        question: "Q17. Which famous scientist developed the theory of general relativity?",
        options: ["A. Isaac Newton", "B. Albert Einstein", "C. Galileo Galilei", "D. Nikola Tesla"],
        correctAnswer: 1, // Index of the correct option (Albert Einstein)
    },
    {
        question: "Q18. In what year did the United States declare its independence?",
        options: ["A. 1776", "B. 1789", "C. 1801", "D. 1812"],
        correctAnswer: 0, // Index of the correct option (1776)
    },
    {
        question: "Q19. What is the longest river in the world?",
        options: ["A. Amazon River", "B. Nile River", "C. Yangtze River", "D. Mississippi River"],
        correctAnswer: 0, // Index of the correct option (Amazon River)
    },
    {
        question: "Q20. Who wrote 'Pride and Prejudice'?",
        options: ["A. Jane Austen", "B. Charlotte Brontë", "C. Emily Dickinson", "D. F. Scott Fitzgerald"],
        correctAnswer: 0, // Index of the correct option (Jane Austen)
    },
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