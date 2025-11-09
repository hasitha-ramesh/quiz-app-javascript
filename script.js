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
    question:
      "Which large mammal is commonly found in Sri Lanka's wildlife reserves?",
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

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let QuestionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = QuestionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct == "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again!";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
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