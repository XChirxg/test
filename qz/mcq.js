

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
            question: "1. The principal of a school conducts an interview session of teachers and students with a view to explore the possibility of their enhanced participation in school programs. This endeavor may be related to which type of research?",
            options: ["Evaluation Research", "Fundamental Research", "Action Research", "Applied Research"],
            correctAnswer: 2, // "Action Research"
        },
        {
            question: "2. In doing action research, what is the usual sequence of steps?",
            options: ["Reflect, observe, plan, act", "Plan, act, observe, reflect", "Plan, reflect, observe, act", "Act, observe, plan, reflect"],
            correctAnswer: 1, // "Plan, act, observe, reflect"
        },
        {
            question: "3. Which sequence of research steps is logical?",
            options: [
                "Problem formulation, analysis, development of research design, hypothesis making, collection of data, arriving at generalizations and conclusions.",
                "Development of research design, hypothesis making, problem formulation, data analysis, arriving at conclusions and data collection.",
                "Problem formulation, hypothesis making, development of a research design, collection of data, data analysis, and formulation of generalizations and conclusions.",
                "Problem formulation, deciding about the sample and data collection tools, formulation of hypothesis, collection, and interpretation of research evidence."
            ],
            correctAnswer: 2, // "Problem formulation, hypothesis making, development of a research design..."
        },
        {
            question: "4. Below are given two sets—research methods (Set-I) and data collection tools (Set-II). Match them and indicate the correct code.",
            options: [
                "Set-I: Experimental Method; Ex post-facto Method; Descriptive Survey Method; Historical Method. Set-II: i) Using primary secondary sources; ii) Questionnaire; iii) Standardized tests; iv) Typical characteristics tests.",
                "A) iii, B) iv, C) ii, D) i",
                "A) ii, B) iii, C) i, D) iv",
                "A) ii, B) iv, C) iii, D) i"
            ],
            correctAnswer: 1, // "A) iii, B) iv, C) ii, D) i"
        },
        {
            question: "5. The issue of 'Research Ethics' may be considered pertinent at which stage of research?",
            options: [
                "At the stage of problem formulation and its definition",
                "At the stage of defining the population of research",
                "At the stage of data collection and interpretation",
                "At the stage of reporting the findings"
            ],
            correctAnswer: 2, // "At the stage of data collection and interpretation"
        },
        {
            question: "6. In which of the following, reporting format is formally prescribed?",
            options: ["Doctoral level thesis", "Conference of researchers", "Workshops and seminars", "Symposia"],
            correctAnswer: 0, // "Doctoral level thesis"
        },
        {
            question: "7. A researcher is interested in studying the prospects of a particular political party in an urban area. What tool should they prefer for the study?",
            options: ["Rating Scale", "Interview", "Questionnaire", "Schedule"],
            correctAnswer: 1, // "Interview"
        },
        {
            question: "8. Which of the following statements is true in the context of testing a hypothesis?",
            options: [
                "Only the alternative hypothesis can be tested.",
                "Only the null hypothesis can be tested.",
                "Both the alternative and the null hypotheses can be tested.",
                "Neither the alternative nor the null hypotheses can be tested."
            ],
            correctAnswer: 1, // "Only the null hypothesis can be tested."
        },
        {
            question: "9. Which sequence represents the correct stages in thesis writing?",
            options: [
                "Problem identification, Literature review, Data collection, Data analysis, Conclusion.",
                "Literature review, Problem identification, Data collection, Conclusion, Data analysis.",
                "Conclusion, Data collection, Problem identification, Literature review, Data analysis.",
                "Problem identification, Data collection, Literature review, Conclusion, Data analysis."
            ],
            correctAnswer: 0, // "Problem identification, Literature review..."
        },
        {
            question: "10. Ethical norms in research do not involve guidelines for:",
            options: ["Thesis format", "Copyright", "Patenting policy", "Data sharing policies"],
            correctAnswer: 0, // "Thesis format"
        },
        {
            question: "11. The basic purpose of research is to:",
            options: [
                "Solve specific problems.",
                "Generate new knowledge.",
                "Develop new theories.",
                "All of the above."
            ],
            correctAnswer: 3, // "All of the above"
        },
        {
            question: "12. Action research is best suited for which of the following?",
            options: [
                "Solving immediate problems.",
                "Understanding long-term trends.",
                "Developing abstract theories.",
                "Revising historical events."
            ],
            correctAnswer: 0, // "Solving immediate problems."
        },
        {
            question: "13. Which of the following is an example of a descriptive research method?",
            options: ["Case Study", "Experiment", "Action Research", "Historical Research"],
            correctAnswer: 0, // "Case Study"
        },
        {
            question: "14. A variable that is manipulated in an experiment is known as:",
            options: ["Dependent Variable", "Independent Variable", "Extraneous Variable", "Controlled Variable"],
            correctAnswer: 1, // "Independent Variable"
        },
        {
            question: "15. Which method is most suitable for studying cause-and-effect relationships?",
            options: ["Experimental Method", "Historical Method", "Case Study Method", "Survey Method"],
            correctAnswer: 0, // "Experimental Method"
        },
        {
            question: "16. Sampling method involves selecting:",
            options: [
                "The entire population.",
                "A subset of the population.",
                "Only the independent variable.",
                "The dependent variable."
            ],
            correctAnswer: 1, // "A subset of the population."
        },
        {
            question: "17. The primary purpose of a literature review is to:",
            options: [
                "Summarize existing knowledge.",
                "Develop a research problem.",
                "Establish the context of the research.",
                "All of the above."
            ],
            correctAnswer: 3, // "All of the above"
        },
        {
            question: "18. Which of the following is considered a qualitative data collection method?",
            options: ["Interviews", "Experiments", "Surveys", "Statistical Analysis"],
            correctAnswer: 0, // "Interviews"
        },
        {
            question: "19. What does a null hypothesis state?",
            options: [
                "There is a relationship between variables.",
                "There is no relationship between variables.",
                "There is a positive correlation.",
                "There is a negative correlation."
            ],
            correctAnswer: 1, // "There is no relationship between variables."
        },
        {
            question: "20. Anonymity in research refers to:",
            options: [
                "Keeping the research method confidential.",
                "Ensuring that participants cannot be identified.",
                "Hiding the research findings.",
                "Conducting research without the participant's knowledge."
            ],
            correctAnswer: 1, // "Ensuring that participants cannot be identified."
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