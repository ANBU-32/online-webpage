// =====================================
// QUIZ.JS
// =====================================

// -------------------------------------
// Timer
// -------------------------------------

function startTimer() {

    clearInterval(timerInterval);

    updateTimer();

    timerInterval = setInterval(() => {

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            finishQuiz();

            return;

        }

        timeLeft--;

        updateTimer();

    }, 1000);

}

function updateTimer() {

    const timer = document.getElementById("timer");

    if (!timer) return;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}

// -------------------------------------
// Render Question
// -------------------------------------

function renderQuestion() {

    const q = questions[currentQuestion];

    quizBox.innerHTML = `

    <div class="quiz-card">

        <div class="quiz-header">

            <h3>
                Question ${currentQuestion + 1}
                of
                ${questions.length}
            </h3>

            <div id="timer" class="timer"></div>

        </div>

        <div class="progress">

            <div
                class="progress-fill"
                style="width:${((currentQuestion + 1) / questions.length) * 100}%">
            </div>

        </div>

        <h2 class="question">

            ${q.q}

        </h2>

        <div id="options">

            ${q.opts.map((option, index) => `

                <button
                    class="option ${selectedAnswers[currentQuestion] === index ? "active" : ""}"
                    onclick="selectAnswer(${index})">

                    ${option}

                </button>

            `).join("")}

        </div>

        <div class="quiz-buttons">

            <button
                class="btn"
                onclick="previousQuestion()"
                ${currentQuestion === 0 ? "disabled" : ""}>

                Previous

            </button>

            <button
                class="btn"
                onclick="nextQuestion()">

                ${currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}

            </button>

        </div>

    </div>

    `;

    updateTimer();

}

// -------------------------------------
// Select Answer
// -------------------------------------

function selectAnswer(index) {

    selectedAnswers[currentQuestion] = index;

    renderQuestion();

}
// =====================================
// Navigation
// =====================================

// Next Question
function nextQuestion() {

    if (selectedAnswers[currentQuestion] === null) {

        let error = document.getElementById("answerError");

        if (!error) {

            error = document.createElement("p");

            error.id = "answerError";
            error.style.color = "#e53935";
            error.style.marginTop = "10px";
            error.style.fontWeight = "600";
            error.textContent = "Please select an answer before continuing.";

            document
                .getElementById("options")
                .appendChild(error);

        }

        return;

    }

    const error = document.getElementById("answerError");

    if (error) {

        error.remove();

    }

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        renderQuestion();

    } else {

        finishQuiz();

    }

}

// Previous Question
function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();

    }

}