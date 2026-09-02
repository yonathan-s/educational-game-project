let quizData = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const viewQuiz = document.getElementById("state-quiz");
const viewFeedback = document.getElementById("state-feedback");

const questionTextEl = document.getElementById("question-text");
const optionsGridEl = document.getElementById("options-grid");
const timerDisplayEl = document.getElementById("timer-display");
const quizPointsEl = document.getElementById("quiz-points-display");
const quizProgressLabel = document.getElementById("quiz-progress-label");
const quizProgressFill = document.getElementById("quiz-progress-fill");

const feedbackProgressLabel = document.getElementById(
  "feedback-progress-label",
);
const feedbackProgressFill = document.getElementById("feedback-progress-fill");
const feedbackPointsEl = document.getElementById("feedback-points-display");
const feedbackBadgeStatus = document.getElementById("feedback-badge-status");
const feedbackBadgePoints = document.getElementById("feedback-badge-points");
const feedbackMessageText = document.getElementById("feedback-message-text");
const continueBtn = document.getElementById("continue-btn");

async function startQuiz() {
  correctCount = 0;
  await loadNewQuestion();
}

async function loadNewQuestion() {
  clearInterval(timerInterval);

  try {
    const data = await fetchRandomQuestion();
    currentQuestion = {
      id: data.question.id,
      text: data.question.question_text,
      answers: data.asnwers,
    };
  } catch (err) {
    console.error("Could not load question:", err);
    return;
  }

  viewQuiz.style.display = "block";
  viewFeedback.style.display = "none";
  renderQuestion();
}

function renderQuestion() {
  timeLeft = 30;
  timerDisplayEl.textContent = timeLeft;
  startTimer();

  questionTextEl.textContent = q.question;
  optionsGridEl.innerHTML = "";

  updateProgess(quizProgressLabel, quizProgressFill);
  quizPointsEl.textContent = `${correctCount * 100} pts`;

  currentQuestion.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.style.cursor = "pointer";
    btn.textContent = answer.answer_text;
    btn.addEventListener("click", () => handleAnswerClick(answer.id));
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplayEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      evaluateChoice(null, quizData[currentQuestion].correct);
    }
  }, 1000);
}

function evaluateChoice(selectedChoice, correctChoice) {
  clearInterval(timerInterval);

  viewQuiz.style.display = "none";
  viewFeedback.style.display = "block";

  const displayNum = currentQuestion + 1;
  const progressPercentage = (displayNum / quizData.length) * 100;
  feedbackProgressLabel.textContent = `Question ${displayNum}/${quizData.length}`;
  feedbackProgressFill.style.width = `${progressPercentage}%`;

  if (selectedChoice === correctChoice) {
    score++;
    feedbackBadgeStatus.innerHTML = "WELL<br />DONE";
    feedbackBadgePoints.textContent = "+100pts";
    feedbackMessageText.textContent =
      "Good job answering the question, you are one step closer to escape.";
  } else if (selectedChoice === null) {
    feedbackBadgeStatus.innerHTML = "TIME<br />OUT";
    feedbackBadgePoints.textContent = "0pts";
    feedbackMessageText.textContent =
      "Sorry, your time ran out. Have another look and try the question again.";
  } else {
    feedbackBadgeStatus.innerHTML = "NOT<br />QUITE";
    feedbackBadgePoints.textContent = "0pts";
    feedbackMessageText.textContent =
      "That isn't right. Have another look and try the question again.";
  }

  feedbackPointsEl.textContent = `${score * 100} pts`;
}

function advanceQuiz() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    viewFeedback.style.display = "none";
    viewQuiz.style.display = "block";
    renderQuestion();
  } else {
    console.log("End Quiz");
  }
}

continueBtn.addEventListener("click", advanceQuiz);

loadQuizData();
