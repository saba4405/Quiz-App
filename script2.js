const questions = [
  { question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HighText Machine Language", "HyperText Markdown Language"],
    answer: 1, hint: "It is a markup language, not a programming language." },

  { question: "Which CSS property changes the text color?",
    options: ["font-color", "text-style", "color", "background"],
    answer: 2, hint: "It is the shortest and simplest name." },

  { question: "Which HTML tag creates the largest heading?",
    options: ["<h6>", "<head>", "<heading>", "<h1>"],
    answer: 3, hint: "Headings go from 1 to 6." },

  { question: "What does typeof null return in JavaScript?",
    options: ["\"object\"", "\"null\"", "\"undefined\"", "\"number\""],
    answer: 0, hint: "It is a famous JS quirk." },

  { question: "Which CSS property adds space OUTSIDE an element's border?",
    options: ["padding", "margin", "spacing", "gap"],
    answer: 1, hint: "Padding is the space inside." },

  { question: "Which array method adds an item to the END of an array?",
    options: ["pop()", "shift()", "push()", "unshift()"],
    answer: 2, hint: "Think of pushing something onto a pile." },

  { question: "What does === check in JavaScript?",
    options: ["Only value", "Only type", "Value and type", "Neither"],
    answer: 2, hint: "It is the strict one." },

  { question: "Which attribute opens a link in a new tab?",
    options: ["target=\"_blank\"", "href=\"_new\"", "open=\"tab\"", "rel=\"new\""],
    answer: 0, hint: "It is used on the <a> tag." },

  { question: "Which keyword declares a variable that cannot be reassigned?",
    options: ["var", "let", "static", "const"],
    answer: 3, hint: "Short for constant." },

  { question: "Which method converts a JSON string into a JS object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
    answer: 0, hint: "Do not mix it up with stringify." }
];

// ---------- 2. QUIZ CLASS (logic only, no DOM) ----------
class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }
  checkAnswer(selectedIndex) {
    const isCorrect = selectedIndex === this.getCurrentQuestion().answer;
    if (isCorrect) this.score++;
    return isCorrect;
  }
  nextQuestion() {
    this.currentIndex++;
  }
  isFinished() {
    return this.currentIndex >= this.questions.length;
  }
}

// ---------- 3. GRAB ELEMENTS ----------
const timerEl = document.getElementById("timer");
const qNumberEl = document.getElementById("qNumber");
const questionEl = document.getElementById("questions");
const optionsEl = document.getElementById("options");
const hintBtn = document.getElementById("hintBtn");
const hintText = document.getElementById("hintText");
const nextBtn = document.getElementById("next");
const quizArea = document.getElementById("quizArea");
const resultEl = document.getElementById("result");

// ---------- 4. STATE (values that change while the quiz runs) ----------
const quiz = new Quiz(questions);
const TOTAL_TIME = 20;
let timeLeft = TOTAL_TIME;
let countdown = null;     // holds the setInterval id
let autoNext = null;      // holds the setTimeout id
let answered = false;     // has the user already picked or timed out?

// ---------- 5. FUNCTIONS (one job each) ----------
function showQuestion() {
  const q = quiz.getCurrentQuestion();
  answered = false;
  hintText.textContent = "";
  qNumberEl.textContent = `Question ${quiz.currentIndex + 1} of ${quiz.questions.length}`;
  questionEl.textContent = q.question;
  nextBtn.textContent = quiz.currentIndex === quiz.questions.length - 1 ? "Finish" : "Next";

  optionsEl.innerHTML = "";                       // clear old buttons
  for (let i = 0; i < q.options.length; i++) {
    const btn = document.createElement("button");
    btn.className = "option";

    const text = document.createElement("span");
    text.textContent = q.options[i];              // textContent, so "<h1>" shows as text

    const icon = document.createElement("span");
    icon.className = "icon";

    btn.appendChild(text);
    btn.appendChild(icon);
    btn.addEventListener("click", function () {
      selectAnswer(i);
    });
    optionsEl.appendChild(btn);
  }

  startTimer();
}

function startTimer() {
  clearInterval(countdown);                       // stop any old timer first
  timeLeft = TOTAL_TIME;
  timerEl.textContent = timeLeft;

  countdown = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(countdown);
      timeUp();
    }
  }, 1000);
}

function selectAnswer(selectedIndex) {
  if (answered) return;                           // block double answers
  answered = true;
  clearInterval(countdown);                       // stop the timer
  quiz.checkAnswer(selectedIndex);
  showAnswerColors(selectedIndex);
}

function timeUp() {
  if (answered) return;
  answered = true;
  showAnswerColors(null);                         // null = nothing was chosen
  autoNext = setTimeout(goNext, 1500);            // move on after 1.5 seconds
}

function showAnswerColors(selectedIndex) {
  const correctIndex = quiz.getCurrentQuestion().answer;
  const buttons = optionsEl.querySelectorAll(".option");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;                   // lock all options
    const icon = buttons[i].querySelector(".icon");

    if (i === correctIndex) {
      buttons[i].classList.add("correct");
      icon.textContent = "✓";
    } else if (i === selectedIndex) {
      buttons[i].classList.add("wrong");
      icon.textContent = "✗";
    }
  }
}

function goNext() {
  clearTimeout(autoNext);
  clearInterval(countdown);
  quiz.nextQuestion();

  if (quiz.isFinished()) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  const name = localStorage.getItem("playerName") || "Player";
  const total = quiz.questions.length;
  const percent = (quiz.score / total) * 100;

  let message;
  if (percent >= 80) message = "Great job! 🎉";
  else if (percent >= 50) message = "Good try! 👍";
  else message = "Keep practicing! 💪";

  quizArea.classList.add("hidden");
  resultEl.classList.remove("hidden");
  document.getElementById("resultTitle").textContent = `Well done, ${name}!`;
  document.getElementById("resultScore").textContent = `You scored ${quiz.score} out of ${total}`;
  document.getElementById("resultMsg").textContent = message;
}

// ---------- 6. EVENTS (added once, outside functions) ----------
hintBtn.addEventListener("click", function () {
  hintText.textContent = quiz.getCurrentQuestion().hint;
});
nextBtn.addEventListener("click", goNext);
document.getElementById("restart").addEventListener("click", function () {
  window.location.href = "index.html";
});

// ---------- 7. START ----------
showQuestion();