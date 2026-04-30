const questions = [
  {
    question: "What is the capital of Sri Lanka?",
    answers: [
      { text: "Jayawardenepura Kotte", correct: true },
      { text: "Kandy", correct: false },
      { text: "Jaffna", correct: false },
      { text: "Galle", correct: false },
    ],
  },
  {
    question: "Which large mammal is commonly found in Sri Lanka's wildlife reserves?",
    answers: [
      { text: "Elephant", correct: true },
      { text: "Tiger", correct: false },
      { text: "Lion", correct: false },
      { text: "Kangaroo", correct: false },
    ],
  },
  {
    question: "What is the main religion of Sri Lanka?",
    answers: [
      { text: "Buddhism", correct: true },
      { text: "Christianity", correct: false },
      { text: "Hinduism", correct: false },
      { text: "Islam", correct: false },
    ],
  },
  {
    question: "Name a popular rice flour dish in Sri Lanka?",
    answers: [
      { text: "Hoppers", correct: true },
      { text: "Pizza", correct: false },
      { text: "Sushi", correct: false },
      { text: "Tacos", correct: false },
    ],
  },
];

const OPTION_LABELS = ["A", "B", "C", "D"];

const questionElement = document.getElementById("question");
const answerButtons  = document.getElementById("answer-btns");
const nextButton     = document.getElementById("next-btn");
const progressFill   = document.getElementById("progress-fill");
const stepLabel      = document.getElementById("step-label");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next →";
  nextButton.style.display = "none";
  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];

  stepLabel.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  progressFill.style.width = (currentQuestionIndex / questions.length * 100) + "%";
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = `<span class="opt-label">${OPTION_LABELS[index]}</span>${answer.text}`;
    if (answer.correct) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.currentTarget;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  progressFill.style.width = ((currentQuestionIndex + 1) / questions.length * 100) + "%";
  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  const pct = Math.round(score / questions.length * 100);
  const emoji = pct === 100 ? "🏆" : pct >= 75 ? "🌟" : pct >= 50 ? "👍" : "📚";
  const title = pct === 100 ? "Perfect score!" : pct >= 75 ? "Great job!" : pct >= 50 ? "Good effort!" : "Keep practicing!";

  stepLabel.textContent = "Quiz complete";
  progressFill.style.width = "100%";

  questionElement.innerHTML = `
    <div class="score-screen">
      <div class="score-icon">${emoji}</div>
      <div class="score-number">${score}</div>
      <div class="score-total">out of ${questions.length} correct</div>
      <div class="score-title">${title}</div>
      <div class="score-sub">You completed the Sri Lanka Quiz</div>
    </div>
  `;

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
