// =====================================
// MBBS BIOLOGY QUIZ ENGINE
// =====================================

// ========================
// BACKEND CONFIG
// ========================

const API_CONFIG = {
  // Auto-detect: use localhost when running locally, production otherwise
  BASE_URL: (() => {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "http://localhost:3000/api";          // Local dev server
    }
    return "https://online-webpage-mqpl.onrender.com/api"; // Production
  })(),

  TIMEOUT_MS: 35000,   // 35s — enough for Render cold-start (~30s)
  MAX_RETRIES: 2,      // Retry once on network failure
};

// ========================
// CORE FETCH HELPER
// ========================

async function apiFetch(endpoint, options = {}, retries = API_CONFIG.MAX_RETRIES) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      ...options,
    });
    clearTimeout(timer);

    // Parse JSON safely
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); }
    catch { data = { success: false, message: "Invalid server response." }; }

    return { ok: response.ok, status: response.status, data };

  } catch (err) {
    clearTimeout(timer);

    if (err.name === "AbortError") {
      return {
        ok: false, status: 0,
        data: { success: false, message: "Server is waking up. Please wait 30 seconds and try again." }
      };
    }

    // Retry on network errors (not timeouts)
    if (retries > 0) {
      await new Promise(r => setTimeout(r, 2000)); // wait 2s before retry
      return apiFetch(endpoint, options, retries - 1);
    }

    return {
      ok: false, status: 0,
      data: { success: false, message: "Cannot connect. Check your internet connection." }
    };
  }
}

// =====================================
// QUESTIONS
// =====================================

const questions = [
  // ===== PLANT BIOLOGY =====
  { q:'Photosynthesis occurs in:', opts:['Nucleus','Chloroplast','Ribosome','Vacuole'], ans:1 },
  { q:'Water is transported through:', opts:['Phloem','Xylem','Cortex','Cambium'], ans:1 },
  { q:'The green pigment in plants is:', opts:['Chlorophyll','Melanin','Hemoglobin','Carotene'], ans:0 },
  { q:'Potato is a modified:', opts:['Root','Stem','Leaf','Fruit'], ans:1 },
  { q:'Mendel worked on:', opts:['Rice','Wheat','Pea','Maize'], ans:2 },
  { q:'Study of fungi is called:', opts:['Ecology','Cytology','Mycology','Genetics'], ans:2 },
  { q:'Food is transported by:', opts:['Xylem','Phloem','Epidermis','Cortex'], ans:1 },
  { q:'Cell wall is mainly made of:', opts:['Chitin','Cellulose','Protein','Lipid'], ans:1 },
  { q:'Double fertilization occurs in:', opts:['Bryophytes','Gymnosperms','Angiosperms','Pteridophytes'], ans:2 },
  { q:'Sporopollenin is present in:', opts:['Ovule','Seed coat','Pollen wall','Endosperm'], ans:2 },
  { q:'Coconut water is:', opts:['Embryo','Endosperm','Cotyledon','Pericarp'], ans:1 },
  { q:'Which is a C4 plant?', opts:['Rice','Wheat','Maize','Potato'], ans:2 },
  { q:'Nitrogen fixation in legumes is carried out by:', opts:['Yeast','Rhizobium','Amoeba','Algae'], ans:1 },
  { q:'Guard cells regulate:', opts:['Respiration','Germination','Stomatal opening','Reproduction'], ans:2 },
  { q:'The edible part of mango is:', opts:['Endocarp','Mesocarp','Seed','Epicarp'], ans:1 },
  { q:'ATP is known as:', opts:['Hormone','Enzyme','Energy Currency','Pigment'], ans:2 },
  { q:'Bryophytes are called:', opts:['Flowering Plants','Amphibians of Plant Kingdom','Seed Plants','Vascular Plants'], ans:1 },
  { q:'First stable product of Calvin cycle is:', opts:['OAA','PEP','PGA','RuBP'], ans:2 },
  { q:'Casparian strips occur in:', opts:['Cortex','Epidermis','Endodermis','Pericycle'], ans:2 },
  { q:'Enzyme responsible for CO2 fixation:', opts:['Catalase','ATPase','Rubisco','Amylase'], ans:2 },
  { q:'Crossing over occurs during:', opts:['Leptotene','Zygotene','Pachytene','Diplotene'], ans:2 },
  { q:'Aleurone layer is rich in:', opts:['Lipids','Proteins','DNA','Cellulose'], ans:1 },
  { q:'Water potential of pure water is:', opts:['+1','-1','0','100'], ans:2 },
  { q:'Double fertilization was discovered by:', opts:['Mendel','Darwin','Nawaschin','Lamarck'], ans:2 },
  { q:'Pleiotropy means:', opts:['One trait controlled by many genes','One gene controls many traits','Linked genes','Multiple alleles'], ans:1 },

  // ===== HUMAN BIOLOGY =====
  { q:'Functional unit of kidney:', opts:['Neuron','Nephron','Alveolus','Osteon'], ans:1 },
  { q:'Human heart has:', opts:['2 chambers','3 chambers','4 chambers','5 chambers'], ans:2 },
  { q:'Oxygen carrying pigment in blood:', opts:['Keratin','Hemoglobin','Melanin','Myosin'], ans:1 },
  { q:'Insulin is secreted by:', opts:['Liver','Pancreas','Thyroid','Kidney'], ans:1 },
  { q:'Human chromosome number:', opts:['44','45','46','48'], ans:2 },
  { q:'Largest gland in body:', opts:['Thyroid','Liver','Pancreas','Pituitary'], ans:1 },
  { q:'Study of animals is:', opts:['Botany','Zoology','Ecology','Genetics'], ans:1 },
  { q:'Basic unit of life:', opts:['Tissue','Organ','Cell','Organ System'], ans:2 },
  { q:'Pacemaker of heart:', opts:['AV Node','SA Node','Bundle of His','Purkinje Fibres'], ans:1 },
  { q:'Universal recipient blood group:', opts:['O-','A+','B+','AB+'], ans:3 },
  { q:'Site of fertilization in humans:', opts:['Ovary','Uterus','Fallopian Tube','Vagina'], ans:2 },
  { q:'Antibodies are produced by:', opts:['RBC','Platelets','Lymphocytes','Plasma'], ans:2 },
  { q:'Human sperm is:', opts:['Diploid','Haploid','Triploid','Tetraploid'], ans:1 },
  { q:'Vitamin D deficiency causes:', opts:['Scurvy','Beriberi','Rickets','Pellagra'], ans:2 },
  { q:'Largest bone in human body:', opts:['Tibia','Radius','Femur','Humerus'], ans:2 },
  { q:'Smallest bone in human body:', opts:['Stapes','Malleus','Incus','Ulna'], ans:0 },
  { q:'Growth hormone is secreted by:', opts:['Thyroid','Pituitary','Pancreas','Adrenal'], ans:1 },
  { q:'Acrosome is derived from:', opts:['Nucleus','Mitochondria','Golgi Apparatus','Ribosome'], ans:2 },
  { q:'Immunoglobulin crossing placenta:', opts:['IgA','IgM','IgG','IgE'], ans:2 },
  { q:'Respiratory centre is located in:', opts:['Cerebrum','Cerebellum','Medulla Oblongata','Hypothalamus'], ans:2 },
  { q:'Sertoli cells are present in:', opts:['Ovary','Kidney','Testis','Liver'], ans:2 },
  { q:'Synapsis occurs during:', opts:['Mitosis','Meiosis I','Meiosis II','Cytokinesis'], ans:1 },
  { q:'Rh factor was discovered by:', opts:['Watson','Mendel','Landsteiner & Wiener','Darwin'], ans:2 },
  { q:'Hormone that lowers blood calcium:', opts:['PTH','Calcitonin','Insulin','Adrenaline'], ans:1 },
  { q:'First heart sound is due to closure of:', opts:['Semilunar Valves','AV Valves','Aortic Valve','Pulmonary Valve'], ans:1 }
];


const API_URL = "https://online-webpage-mqpl.onrender.com/api/applications";

// -------------------------------
// Global Variables
// -------------------------------

let currentQuestion = 0;
let selectedAnswers = [];
let score = 0;

const totalTime = 50 * 60;
let timeLeft = totalTime;
let timerInterval = null;

// -------------------------------
// Elements
// -------------------------------

const registerSection = document.getElementById("register");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");

const startBtn = document.getElementById("startQuiz");
const quizBox = document.getElementById("quizBox");

// -------------------------------
// Error Helpers
// -------------------------------

function showError(fieldId, errorId, message) {

    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    if (error) {
        error.textContent = message;
    }

    if (field) {
        field.classList.add("input-error");
        field.classList.remove("input-success");
    }
}

function clearError(fieldId, errorId) {

    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    if (error) {
        error.textContent = "";
    }

    if (field) {
        field.classList.remove("input-error");
        field.classList.add("input-success");
    }
}

// -------------------------------
// Registration
// -------------------------------

startBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const state = document.getElementById("state").value;
    const neet = document.getElementById("neet").value;
    const neetscore = document.getElementById("neetscore").value.trim();

    let valid = true;

    // -----------------------
    // Name
    // -----------------------

    if (name === "") {

        showError(
            "name",
            "nameError",
            "Please enter your name."
        );

        valid = false;

    } else {

        clearError("name", "nameError");

    }

    // -----------------------
    // Mobile
    // -----------------------

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

    // -----------------------
    // Email
    // -----------------------

    if (!/^\S+@\S+\.\S+$/.test(email)) {

        showError(
            "email",
            "emailError",
            "Enter a valid email."
        );

        valid = false;

    } else {

        clearError("email", "emailError");

    }

    // -----------------------
    // State
    // -----------------------

    if (
        state === "" ||
        state === "Select State"
    ) {

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

    // -----------------------
    // Save to Backend
    // -----------------------

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name,
                mobile,
                email,
                state,
                neet,
                neetscore

            })

        });

        const data = await response.json();

        if (!response.ok || !data.success) {

            showError(
                "name",
                "nameError",
                data.message || "Registration failed."
            );

            return;

        }

        // -----------------------
        // Start Quiz
        // -----------------------

        registerSection.style.display = "none";
        quizSection.style.display = "block";

        currentQuestion = 0;
        score = 0;
        timeLeft = totalTime;

        selectedAnswers = new Array(
            questions.length
        ).fill(null);

        startTimer();
        renderQuestion();

    }

    catch (err) {

        console.error(err);

        showError(
            "name",
            "nameError",
            "Cannot connect to server."
        );

    }

});
// ======================================
// Part 2 - Timer & Question Rendering
// ======================================

// -------------------------------
// Timer
// -------------------------------

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

// -------------------------------
// Render Question
// -------------------------------

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

                <div id="timer" class="timer">
                    00:00
                </div>

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

                ${q.opts.map((option,index)=>`

                    <button
                        class="option ${selectedAnswers[currentQuestion]===index ? "active" : ""}"
                        onclick="selectAnswer(${index})">

                        ${option}

                    </button>

                `).join("")}

            </div>

            <div class="quiz-buttons">

                <button
                    class="btn"
                    onclick="previousQuestion()"
                    ${currentQuestion===0 ? "disabled" : ""}>

                    Previous

                </button>

                <button
                    class="btn"
                    onclick="nextQuestion()">

                    ${currentQuestion===questions.length-1 ? "Finish Quiz" : "Next"}

                </button>

            </div>

        </div>

    `;

    updateTimer();

}

// -------------------------------
// Select Answer
// -------------------------------

function selectAnswer(index) {

    selectedAnswers[currentQuestion] = index;

    renderQuestion();

}
// ======================================
// Part 3 - Navigation & Results
// ======================================

// -------------------------------
// Next Question
// -------------------------------

function nextQuestion() {

    if (selectedAnswers[currentQuestion] === null) {

        let error = document.getElementById("answerError");

        if (!error) {

            error = document.createElement("p");

            error.id = "answerError";
            error.style.color = "#e53935";
            error.style.marginTop = "10px";
            error.style.fontSize = "14px";
            error.style.fontWeight = "600";

            error.textContent =
                "Please select an answer before continuing.";

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

// -------------------------------
// Previous Question
// -------------------------------

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();

    }

}

// -------------------------------
// Finish Quiz
// -------------------------------

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

    }

    else if (percentage >= 75) {

        remark = "🌟 Very Good";

    }

    else if (percentage >= 50) {

        remark = "👍 Good";

    }

    else {

        remark = "📚 Keep Practicing";

    }

    document.getElementById("remark").textContent =
        remark;

}

// -------------------------------
// Restart Quiz
// -------------------------------

function restartQuiz() {

    clearInterval(timerInterval);

    currentQuestion = 0;
    score = 0;
    timeLeft = totalTime;

    selectedAnswers =
        new Array(questions.length).fill(null);

    resultSection.style.display = "none";
    quizSection.style.display = "block";

    startTimer();

    renderQuestion();

}
// ======================================
// Part 4 - WhatsApp & Initialization
// ======================================

// -------------------------------
// WhatsApp Share
// -------------------------------

const whatsappBtn = document.getElementById("whatsappBtn");

if (whatsappBtn) {

    whatsappBtn.addEventListener("click", () => {

        const percentage = Math.round(
            (score / questions.length) * 100
        );

        const message =
`Hello Dr. Abi,

I have completed the MBBS Biology Assessment.

Score : ${score}/${questions.length}
Percentage : ${percentage}%

I am interested in MBBS admission at the
International University of Kyrgyzstan.

Please contact me.

Thank you.`;

        const phone = "919999999999"; // Replace with your WhatsApp number

        window.open(
            `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            "_blank"
        );

    });

}

// -------------------------------
// Initial Page Setup
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {

    if (registerSection)
        registerSection.style.display = "block";

    if (quizSection)
        quizSection.style.display = "none";

    if (resultSection)
        resultSection.style.display = "none";

    console.log("MBBS Biology Quiz Loaded Successfully");

});