let quizData = []
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





// function startQuiz() {
//   showQuestion();
//   startTimer();
//   nextBtn.style.display = "none";
//   resultEl.classList.add("hidden");
// }

// function showQuestion() {
//   const q = quizData[currentQuestion];
//   questionEl.textContent = q.question;

//   choicesEl.innerHTML = "";

//   q.choices.forEach((choice) => {
//     const btn = document.createElement("button");
//     btn.textContent = choice;
//     btn.addEventListener("click", () => selectAnswer(btn, q.correct));
//     choicesEl.appendChild(btn);
//   });
// }

// function selectAnswer(button, correctAnswer) {
//   const selected = button.textContent;

//   Array.from(choicesEl.children).forEach((btn) => {
//     btn.disabled = true;
//     if (btn.textContent === correctAnswer) {
//       btn.style.borderColor = "#00ffcc";
//     }
//     if (btn.textContent === selected && selected !== correctAnswer) {
//       btn.style.borderColor = "#ff4d4d";
//     }
//   });

//   if (selected === correctAnswer) {
//     score++;
//   }

//   nextBtn.style.display = "inline-block";
// }

// function nextQuestion() {
//   currentQuestion++;
//   if (currentQuestion < quizData.length) {
//     showQuestion();
//     nextBtn.style.display = "none";
//   } else {
//     endQuiz();
//   }
// }

// function startTimer() {
//   timeEl.textContent = timeLeft;

//   timer = setInterval(() => {
//     timeLeft--;
//     timeEl.textContent = timeLeft;

//     if (timeLeft <= 0) {
//       clearInterval(timer);
//       endQuiz();
//     }
//   }, 1000);
// }

// function endQuiz() {
//   clearInterval(timer);
//   quizContainer.classList.add("hidden");
//   resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
//   resultEl.classList.remove("hidden");
//   restartBtn.classList.remove("hidden");
// }

// nextBtn.addEventListener("click", nextQuestion);

// restartBtn.addEventListener("click", () => {
//   currentQuestion = 0;
//   score = 0;
//   timeLeft = 30;
//   resultEl.classList.add("hidden");
//   restartBtn.classList.add("hidden");
//   quizContainer.classList.remove("hidden");
//   timeEl.textContent = timeLeft;
//   startQuiz();
// });

// // Start on page load
// startQuiz();