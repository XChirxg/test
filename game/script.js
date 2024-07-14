document.addEventListener("DOMContentLoaded", function() {
    const questionBox = document.getElementById("question-box");
    const answerBox = document.getElementById("answer-box");

    // Example questions and answers
    const questions = [
        { question: "Allocate rent expense", answer: "Rent is an expense and goes to the Nominal Account (Expenses)" },
        { question: "Record cash received", answer: "Cash is a Real Account (1st Type)" },
        // Add more questions as needed
    ];

    let currentQuestionIndex = 0;

    function displayQuestion() {
        questionBox.innerText = questions[currentQuestionIndex].question;
    }

    function displayAnswer() {
        answerBox.innerText = questions[currentQuestionIndex].answer;
    }

    displayQuestion();

    // Add event listeners for dragging and dropping (simplified example)
    const accountSymbols = document.querySelectorAll(".account-symbol");
    accountSymbols.forEach(symbol => {
        symbol.draggable = true;

        symbol.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text/plain", event.target.innerText);
        });
    });

    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.addEventListener("dragover", function(event) {
            event.preventDefault();
        });

        section.addEventListener("drop", function(event) {
            event.preventDefault();
            const data = event.dataTransfer.getData("text/plain");
            if (section.id === "nominal-account-section" && (data === "Expenses (Black Hole)" || data === "Incomes (White Hole)")) {
                displayAnswer();
            } else if (section.id === "real-account-section" && data.includes("Type")) {
                displayAnswer();
            } else if (section.id === "personal-account-section" && data.includes("Person")) {
                displayAnswer();
            } else {
                answerBox.innerText = "Incorrect! Try again.";
            }
        });
    });
});
