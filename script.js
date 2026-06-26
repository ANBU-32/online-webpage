// =====================================
// MBBS BIOLOGY QUIZ ENGINE
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

let currentQuestion = 0;
let selectedAnswers = [];
let score = 0;
let totalTime = 50 * 60;
let timeLeft = totalTime;
let timerInterval = null;

// Elements
const registerSection = document.getElementById("register");
const quizSection     = document.getElementById("quiz");
const resultSection   = document.getElementById("result");
const startBtn        = document.getElementById("startQuiz");
const quizBox         = document.getElementById("quizBox");

// ========================
// INLINE ERROR HELPER
// ========================

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = message;
  if (field) {
    field.classList.add("input-error");
    field.classList.remove("input-success");
  }
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = "";
  if (field) {
    field.classList.remove("input-error");
    field.classList.add("input-success");
  }
}

// ========================
// START QUIZ (single listener)
// ========================

startBtn.addEventListener("click", async () => {
  const name      = document.getElementById("name").value.trim();
  const mobile    = document.getElementById("mobile").value.trim();
  const email     = document.getElementById("email").value.trim();
  const state     = document.getElementById("state").value;
  const neet      = document.getElementById("neet").value;

  let valid = true;


  if (name === "") {
    showError("name", "nameError", "Please enter your full name.");
    valid = false;
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    showError("name", "nameError", "Name must contain only letters and spaces.");
    valid = false;
  } else {
    clearError("name", "nameError");
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    showError("mobile", "mobileError", "Enter a valid 10-digit Indian mobile number.");
    valid = false;
  } else {
    clearError("mobile", "mobileError");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showError("email", "emailError", "Enter a valid email address.");
    valid = false;
  } else {
    clearError("email", "emailError");
  }

  if (state === "Select State") {
    showError("state", "stateError", "Please select your state.");
    valid = false;
  } else {
    clearError("state", "stateError");
  }

  if (!valid) return;

  try {

    const API_URL = "https://your-backend-url.com/api";

fetch(`${API_URL}/applications`,{ 

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
            neetscore: document.getElementById("neetscore").value

        })

    });

    const data = await response.json();

    if (!data.success) {

        showError(
            "name",
            "nameError",
            "Registration failed."
        );

        return;

    }

} catch (err) {

    console.error(err);

    showError(
        "name",
        "nameError",
        "Cannot connect to backend."
    );

    return;

}

  // All valid — start quiz
  registerSection.style.display = "none";
  quizSection.style.display     = "block";

  currentQuestion  = 0;
  selectedAnswers  = new Array(questions.length).fill(null);
  score            = 0;
  timeLeft         = totalTime;

  startTimer();
  renderQuestion();
});

// ========================
// TIMER
// ========================

function startTimer() {
  clearInterval(timerInterval);
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
  timer.innerHTML =
    minutes.toString().padStart(2, "0") + ":" +
    seconds.toString().padStart(2, "0");
}

// ========================
// RENDER QUESTION
// ========================

function renderQuestion() {

    const q = questions[currentQuestion];

    quizBox.innerHTML = `
        <div class="quiz-card">

            <div class="quiz-header">
                <h3>Question ${currentQuestion + 1} / ${questions.length}</h3>

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

                    ${currentQuestion===questions.length-1 ? "Finish" : "Next"}

                </button>

            </div>

        </div>
    `;

    updateTimer();

}

// ========================
// SELECT ANSWER
// ========================

function selectAnswer(answer) {
  selectedAnswers[currentQuestion] = answer;
  renderQuestion();
}

// ========================
// NAVIGATION
// ========================

function nextQuestion() {
  if (selectedAnswers[currentQuestion] == null) {
    // Show inline error inside quiz card instead of alert
    const existing = document.getElementById("answerError");
    if (!existing) {
      const errMsg = document.createElement("p");
      errMsg.id = "answerError";
      errMsg.style.cssText = "color:red;font-size:13px;margin:6px 0 0;";
      errMsg.textContent = "Please select an answer before continuing.";
      document.getElementById("options").after(errMsg);
    }
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

// ========================
// FINISH & RESULTS
// ========================

function finishQuiz() {
  clearInterval(timerInterval);
  score = 0;
  questions.forEach((q, index) => {
    if (selectedAnswers[index] === q.ans) score++;
  });

  quizSection.style.display  = "none";
  resultSection.style.display = "block";

  const percentage = Math.round((score / questions.length) * 100);

  document.getElementById("scoreText").innerHTML  = score + " / " + questions.length;
  document.getElementById("percentage").innerHTML = percentage + "%";

  let remark = "";
  if      (percentage >= 90) remark = "Trophy Excellent";
  else if (percentage >= 75) remark = "Very Good";
  else if (percentage >= 50) remark = "Good";
  else                       remark = "Keep Practicing";

  document.getElementById("remark").innerHTML = remark;
}

// ========================
// RESTART QUIZ
// ========================

function restartQuiz() {
  currentQuestion = 0;
  score           = 0;
  timeLeft        = totalTime;
  selectedAnswers = new Array(questions.length).fill(null);

  resultSection.style.display = "none";
  quizSection.style.display   = "block";

  startTimer();
  renderQuestion();
}

// ========================
// WHATSAPP SHARE
// ========================

const whatsappBtn = document.getElementById("whatsappBtn");
if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    const percentage = Math.round((score / questions.length) * 100);
    const message =
`Hello Dr. Abi,

My Biology Assessment Result

Score      : ${score}/${questions.length}
Percentage : ${percentage}%

I am interested in MBBS admission at the International University of Kyrgyzstan.

Please contact me.

Thank you.`;
    window.open(
      "https://wa.me/919999999999?text=" + encodeURIComponent(message),
      "_blank"
    );
  });
}