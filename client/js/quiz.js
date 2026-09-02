let quizData = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const questionTextEl = document.getElementById("question-text");
const optionsGridEl = document.getElementById("options-grid");
const timerDisplayEl = document.getElementById("timer-display");
const quizPointsEl = document.getElementById("quiz-points-display");
const quizProgressLabel = document.getElementById("quiz-progress-label");
const quizProgressFill = document.getElementById("quiz-progress-fill");

async function loadQuizData() {
    try {
        // const response = await fetch("https://localhost:3031/questions")
        // quizData = await response.json()

        quizData = [
            {
                question: "Who was the reigning monarch of England in 1536?",
                choices: ["Henry VIII", "Henry VII", "Edward VI", "Mary I"],
                correct: "Henry VIII",
            },
            {
                question:
                    "Hampton Court Palace was originally built for which Cardinal?",
                choices: [
                    "Thomas Wolsey",
                    "Thomas Cranmer",
                    "Thomas More",
                    "Oliver Cromwell",
                ],
                correct: "Thomas Wolsey",
            },
            {
                question:
                    "Which of Henry VIII's wives died at Hampton Court Palace?",
                choices: [
                    "Jane Seymour",
                    "Anne Boleyn",
                    "Catherine of Aragon",
                    "Catherine Howard",
                ],
                correct: "Jane Seymour",
            },
        ];

        startQuiz();
    } catch (err) {
        console.error("Connectivity fault:", err);
    }
}

function startQuiz() {
	currentQuestion = 0
	score = 0

    renderQuestion();
}

function renderQuestion() {
	clearInterval(timerInterval)
	timeLeft = 30
	timerDisplayEl.textContent = timeLeft


    const q = quizData[currentQuestion];
    questionTextEl.textContent = q.question;
    optionsGridEl.innerHTML = "";

    q.choices.forEach((choice) => {
        const btn = document.createElement("button");
		btn.className = "option-btn"
		btn.style.cursor = "pointer"
        btn.textContent = choice;
        btn.addEventListener("click", () => selectAnswer(choice, q.correct));
        optionsGridEl.appendChild(btn);
    });
}

// function selectAnswer(button, correctAnswer) {
//     const selected = button.textContent;

//     Array.from(choicesEl.children).forEach((btn) => {
//         btn.disabled = true;
//         if (btn.textContent === correctAnswer) {
//             btn.style.borderColor = "#00ffcc";
//         }
//         if (btn.textContent === selected && selected !== correctAnswer) {
//             btn.style.borderColor = "#ff4d4d";
//         }
//     });

//     if (selected === correctAnswer) {
//         score++;
//     }

//     nextBtn.style.display = "inline-block";
// }

// function nextQuestion() {
//     currentQuestion++;
//     if (currentQuestion < quizData.length) {
//         showQuestion();
//         nextBtn.style.display = "none";
//     } else {
//         endQuiz();
//     }
// }

// function startTimer() {
//     timeEl.textContent = timeLeft;

//     timer = setInterval(() => {
//         timeLeft--;
//         timeEl.textContent = timeLeft;

//         if (timeLeft <= 0) {
//             clearInterval(timer);
//             endQuiz();
//         }
//     }, 1000);
// }

// function endQuiz() {
//     clearInterval(timer);
//     quizContainer.classList.add("hidden");
//     resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
//     resultEl.classList.remove("hidden");
//     restartBtn.classList.remove("hidden");
// }

// nextBtn.addEventListener("click", nextQuestion);

// restartBtn.addEventListener("click", () => {
//     currentQuestion = 0;
//     score = 0;
//     timeLeft = 30;
//     resultEl.classList.add("hidden");
//     restartBtn.classList.add("hidden");
//     quizContainer.classList.remove("hidden");
//     timeEl.textContent = timeLeft;
//     startQuiz();
// });

// // Start on page load
// startQuiz();
