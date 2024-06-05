let currentUser = null;

function showLogin() {
  hideAll();
  document.getElementById("login").classList.remove("hidden");
}

function showRegister() {
  hideAll();
  document.getElementById("register").classList.remove("hidden");
}

function showCreateQuiz() {
  hideAll();
  document.getElementById("createQuiz").classList.remove("hidden");
  addQuestion(); // Start with one question
}

function showQuizList() {
  hideAll();
  document.getElementById("quizList").classList.remove("hidden");
  loadQuizList();
}

function hideAll() {
  document
    .querySelectorAll(".container > div")
    .forEach((div) => div.classList.add("hidden"));
}

function register(event) {
  event.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  showLogin();
}

function login(event) {
  event.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    currentUser = user;
    alert("Login successful!");
    showHome();
  } else {
    alert("Invalid username or password.");
  }
}

function showHome() {
  hideAll();
  document.getElementById("home").classList.remove("hidden");
}

function addQuestion() {
  const questionContainer = document.createElement("div");
  questionContainer.classList.add("quiz-container");
  questionContainer.innerHTML = `
                <input type="text" placeholder="Question" class="question" required>
                <input type="text" placeholder="Option 1" class="option" required>
                <input type="text" placeholder="Option 2" class="option" required>
                <input type="text" placeholder="Option 3" class="option" required>
                <input type="text" placeholder="Option 4" class="option" required>
                <input type="text" placeholder="Correct Answer (1-4)" class="correctAnswer" required>
            `;
  document.getElementById("questionsContainer").appendChild(questionContainer);
}

function createQuiz(event) {
  event.preventDefault();
  const title = document.getElementById("quizTitle").value;
  const questions = Array.from(
    document.querySelectorAll(".quiz-container")
  ).map((container) => {
    return {
      question: container.querySelector(".question").value,
      options: Array.from(container.querySelectorAll(".option")).map(
        (option) => option.value
      ),
      correctAnswer: container.querySelector(".correctAnswer").value,
    };
  });

  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  quizzes.push({ title, questions });
  localStorage.setItem("quizzes", JSON.stringify(quizzes));

  alert("Quiz created successfully!");
  showHome();
}

function loadQuizList() {
  const quizListContainer = document.getElementById("quizListContainer");
  quizListContainer.innerHTML = "";
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

  quizzes.forEach((quiz, index) => {
    const quizElement = document.createElement("div");
    quizElement.textContent = quiz.title;
    quizElement.style.cursor = "pointer";
    quizElement.onclick = () => startQuiz(index);
    quizListContainer.appendChild(quizElement);
  });
}

function startQuiz(index) {
  hideAll();
  document.getElementById("takeQuiz").classList.remove("hidden");

  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const quiz = quizzes[index];

  document.getElementById("quizTitleDisplay").textContent = quiz.title;

  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML = "";
  quiz.questions.forEach((question, qIndex) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("quiz-container");
    questionElement.innerHTML = `
                    <p>${question.question}</p>
                    ${question.options
                      .map(
                        (option, oIndex) => `
                        <label>
                            <input type="radio" name="question${qIndex}" value="${
                          oIndex + 1
                        }">
                            ${option}
                        </label><br>
                    `
                      )
                      .join("")}
                `;
    quizContainer.appendChild(questionElement);
  });

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Quiz";
  submitButton.onclick = () => submitQuiz(index);
  quizContainer.appendChild(submitButton);
}

function submitQuiz(index) {
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const quiz = quizzes[index];

  let score = 0;

  quiz.questions.forEach((question, qIndex) => {
    const selectedOption = document.querySelector(
      `input[name="question${qIndex}"]:checked`
    );
    if (selectedOption && selectedOption.value == question.correctAnswer) {
      score++;
    }
  });

  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = `Your score: ${score} / ${quiz.questions.length}`;

  hideAll();
  document.getElementById("quizResult").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  showHome();
});
