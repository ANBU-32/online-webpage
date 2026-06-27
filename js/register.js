// =====================================
// REGISTER.JS
// =====================================

if (startBtn) {

    startBtn.addEventListener("click", registerStudent);

}

async function registerStudent(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const state = document.getElementById("state").value;
    const neet = document.getElementById("neet").value;
    const neetscore = document.getElementById("neetscore").value.trim();

    let valid = true;

    // ======================
    // Name Validation
    // ======================

    if (name === "") {

        showError("name", "nameError", "Please enter your name.");
        valid = false;

    } else {

        clearError("name", "nameError");

    }

    // ======================
    // Mobile Validation
    // ======================

    if (!/^[6-9]\d{9}$/.test(mobile)) {

        showError(
            "mobile",
            "mobileError",
            "Enter a valid 10-digit mobile number."
        );

        valid = false;

    } else {

        clearError("mobile", "mobileError");

    }

    // ======================
    // Email Validation
    // ======================

    if (!/^\S+@\S+\.\S+$/.test(email)) {

        showError(
            "email",
            "emailError",
            "Enter a valid email address."
        );

        valid = false;

    } else {

        clearError("email", "emailError");

    }

    // ======================
    // State Validation
    // ======================

    if (state === "" || state === "Select State") {

        showError(
            "state",
            "stateError",
            "Please select your state."
        );

        valid = false;

    } else {

        clearError("state", "stateError");

    }

    if (!valid) return;

    // ======================
    // Save to Backend
    // ======================

    const { ok, data } = await apiFetch("", {

        method: "POST",

        body: JSON.stringify({

            name,
            mobile,
            email,
            state,
            neet,
            neetscore

        })

    });

    if (!ok || !data.success) {

        showError(
            "name",
            "nameError",
            data.message || "Registration failed."
        );

        return;

    }

    startQuiz();

}

// =====================================
// START QUIZ
// =====================================

function startQuiz() {

    registerSection.style.display = "none";
    quizSection.style.display = "block";

    currentQuestion = 0;
    score = 0;
    timeLeft = totalTime;

    selectedAnswers = new Array(questions.length).fill(null);

    startTimer();

    renderQuestion();

}