const REQUIRED_CORRECT = 1;
let currentQuestion = null;
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
  score = 0;
  await loadNewQuestion();
}

async function loadNewQuestion() {
  clearInterval(timerInterval);

  try {
    const data = await fetchRandomQuestion();
    currentQuestion = {
      id: data.question.id,
      text: data.question.question_text,
      answers: data.answers,
    };
  } catch (err) {
    console.error("Could not load question:", err);
    questionTextEl.textContent =
      "Could not load a question. Please refresh the page.";
    optionsGridEl.innerHTML = "";
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

  questionTextEl.textContent = currentQuestion.text;
  optionsGridEl.innerHTML = "";

  updateProgress(quizProgressLabel, quizProgressFill);
  quizPointsEl.textContent = `${score * 100} pts`;

  currentQuestion.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.style.cursor = "pointer";
    btn.textContent = answer.answer_text;
    btn.addEventListener("click", () => handleAnswerClick(answer.id));
    optionsGridEl.appendChild(btn);
  });
}

function updateProgress(labelEl, fillEl) {
  const displayNum = Math.min(score + 1, REQUIRED_CORRECT);
  const progressPercentage = (displayNum / REQUIRED_CORRECT) * 100;
  labelEl.textContent = `Question ${displayNum}/${REQUIRED_CORRECT}`;
  fillEl.style.width = `${progressPercentage}%`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplayEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

async function handleAnswerClick(answerId) {
  clearInterval(timerInterval);

  try {
    const result = await checkAnswer(currentQuestion.id, answerId);
    evaluateChoice(result.correct);
  } catch (err) {
    console.error("Could not check answer:", err);
    evaluateChoice(false);
  }
}

function handleTimeout() {
  evaluateChoice(null);
}

function evaluateChoice(isCorrect) {
  viewQuiz.style.display = "none";
  viewFeedback.style.display = "block";

  if (isCorrect) {
    score++;
  }

  updateProgress(feedbackProgressLabel, feedbackProgressFill);
  feedbackPointsEl.textContent = `${score * 100} pts`;

  if (isCorrect) {
    feedbackBadgeStatus.innerHTML = "WELL<br />DONE";
    feedbackBadgePoints.textContent = "+100pts";
    feedbackMessageText.textContent =
      "Good job answering the question, you are one step closer to escape.";
  } else if (isCorrect === null) {
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
}

async function advanceQuiz() {
  if (score >= REQUIRED_CORRECT) {
    try {
      await advanceStage();
    } catch (err) {
      console.error("Could not advance stage:", err);
    }
    window.location.assign("level.html");
    return;
  }
  await loadNewQuestion();
}

continueBtn.addEventListener("click", advanceQuiz);

startQuiz();
