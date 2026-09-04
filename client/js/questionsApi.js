async function fetchRandomQuestion() {
  const token = localStorage.getItem("token");

  const response = await fetch(`https://history-escape.onrender.com/questions`, {
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Could not load a question for this stage.");
  }

  return response.json();
}

async function checkAnswer(questionId, answerId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`https://history-escape.onrender.com/questions/answer`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      question_id: questionId,
      answer_id: answerId,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not check that answer.");
  }

  return response.json();
}
