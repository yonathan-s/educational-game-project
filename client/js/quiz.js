let quizData = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const viewQuiz = document.getElementById("state-quiz")
const viewFeedback = document.getElementById("state-feedback")

const questionTextEl = document.getElementById("question-text");
const optionsGridEl = document.getElementById("options-grid");
const timerDisplayEl = document.getElementById("timer-display");
const quizPointsEl = document.getElementById("quiz-points-display");
const quizProgressLabel = document.getElementById("quiz-progress-label");
const quizProgressFill = document.getElementById("quiz-progress-fill");

const feedbackProgressLabel = document.getElementById("feedback-progress-label")
const feedbackProgressFill = document.getElementById("feedback-progress-fill")
const feedbackPointsEl = document.getElementById("feedback-points-display")
const feedbackBadgeStatus = document.getElementById("feedback-badge-status")
const feedbackBadgePoints = document.getElementById("feedback-badge-points")
const feedbackMessageText = document.getElementById("feedback-message-text")
const continueBtn = document.getElementById("continue-btn")

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

	viewQuiz.style.display = "block"
	viewFeedback.style.display = "none"

    renderQuestion();
}

function renderQuestion() {
	clearInterval(timerInterval)
	timeLeft = 30
	timerDisplayEl.textContent = timeLeft
	startTimer()

    const q = quizData[currentQuestion];
    questionTextEl.textContent = q.question;
    optionsGridEl.innerHTML = "";

	const displayNum = currentQuestion + 1
	const progressPercentage = (displayNum / quizData.length) * 100

	quizProgressLabel.textContent = `Question ${displayNum}/${quizData.length}`
	quizProgressFill.style.width = `${progressPercentage}%`
	quizPointsEl.textContent = `${score * 100} pts`

    q.choices.forEach((choice) => {
        const btn = document.createElement("button");
		btn.className = "option-btn"
		btn.style.cursor = "pointer"
        btn.textContent = choice;
        btn.addEventListener("click", () => evaluateChoice(choice, q.correct));
        optionsGridEl.appendChild(btn);
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplayEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            evaluateChoice(null, quizData[currentQuestion].correct)
        }
    }, 1000);
}

function evaluateChoice(selectedChoice, correctChoice) {
	clearInterval(timerInterval)

	viewQuiz.style.display = "none"
	viewFeedback.style.display = "block"

	const displayNum = currentQuestion + 1
	const progressPercentage = (displayNum / quizData.length) * 100
	feedbackProgressLabel.textContent = `Question ${displayNum}/${quizData.length}`
	feedbackProgressFill.style.width = `${progressPercentage}%`

	if (selectedChoice === correctChoice) {
		score++
		feedbackBadgeStatus.innerHTML = "WELL<br />DONE"
		feedbackBadgePoints.textContent = "+100pts"
		feedbackMessageText.textContent = "Good job answering the question, you are one step closer to escape."

	} else if (selectedChoice === null) {
		feedbackBadgeStatus.innerHTML = "TIME<br />OUT"
		feedbackBadgePoints.textContent = "0pts"
		feedbackMessageText.textContent = "Sorry, your time ran out. Have another look and try the question again."
	} else {
		feedbackBadgeStatus.innerHTML = "NOT<br />QUITE"
		feedbackBadgePoints.textContent = "0pts"
		feedbackMessageText.textContent = "That isn't right. Have another look and try the question again."
	}

	feedbackPointsEl.textContent = `${score * 100} pts`
}

function advanceQuiz() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
		viewFeedback.style.display = "none"
		viewQuiz.style.display = "block"
        renderQuestion()
    } else {
        console.log("End Quiz")
        sessionStorage.setItem("activeStageNumber", 4)
        window.location.href = "level.html";
    }
}

continueBtn.addEventListener("click", advanceQuiz)

loadQuizData()
