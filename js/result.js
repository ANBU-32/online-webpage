// =====================================
// RESULT.JS
// =====================================

// -------------------------------------
// Finish Quiz
// -------------------------------------

function finishQuiz() {

    clearInterval(timerInterval);

    score = 0;

    questions.forEach((question, index) => {

        if (selectedAnswers[index] === question.ans) {

            score++;

        }

    });

    registerSection.style.display = "none";
    quizSection.style.display = "none";
    resultSection.style.display = "block";

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("scoreText").textContent =
        `${score} / ${questions.length}`;

    document.getElementById("percentage").textContent =
        `${percentage}%`;

    let remark = "";

    if (percentage >= 90) {

        remark = "🏆 Excellent";

    } else if (percentage >= 75) {

        remark = "🌟 Very Good";

    } else if (percentage >= 50) {

        remark = "👍 Good";

    } else {

        remark = "📚 Keep Practicing";

    }

    document.getElementById("remark").textContent = remark;

}

// -------------------------------------
// Restart Quiz
// -------------------------------------

function restartQuiz() {

    clearInterval(timerInterval);

    currentQuestion = 0;
    score = 0;
    timeLeft = totalTime;

    selectedAnswers = new Array(questions.length).fill(null);

    resultSection.style.display = "none";
    quizSection.style.display = "block";

    startTimer();
    renderQuestion();

}

// -------------------------------------
// WhatsApp Share
// -------------------------------------

const whatsappBtn = document.getElementById("whatsappBtn");

if (whatsappBtn) {

    whatsappBtn.addEventListener("click", () => {

        const percentage = Math.round(
            (score / questions.length) * 100
        );

        const message = `Hello Dr. Abi,

I have completed the MBBS Biology Assessment.

Score : ${score}/${questions.length}
Percentage : ${percentage}%

I am interested in MBBS admission at the
International University of Kyrgyzstan.

Please contact me.

Thank you.`;

        const phone = "91 6374242482"; // Replace with your WhatsApp number

        window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            "_blank"
        );

    });

}

// -------------------------------------
// Page Initialization
// -------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    if (registerSection)
        registerSection.style.display = "block";

    if (quizSection)
        quizSection.style.display = "none";

    if (resultSection)
        resultSection.style.display = "none";

    console.log("MBBS Biology Quiz Loaded Successfully");

});