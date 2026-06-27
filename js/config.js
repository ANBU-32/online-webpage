// =====================================
// CONFIGURATION
// =====================================

// Backend API
const API_CONFIG = {
    BASE_URL: (() => {
        const host = window.location.hostname;

        if (host === "localhost" || host === "127.0.0.1") {
            return "http://localhost:3000/api";
        }

        return "https://online-webpage-7yxo.onrender.com/api/applications";
    })(),

    TIMEOUT_MS: 35000,
    MAX_RETRIES: 2
};

// =====================================
// GLOBAL VARIABLES
// =====================================

let currentQuestion = 0;
let selectedAnswers = [];
let score = 0;

const totalTime = 50 * 60;
let timeLeft = totalTime;
let timerInterval = null;

// =====================================
// COMMON ELEMENTS
// =====================================

const registerSection = document.getElementById("register");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");

const startBtn = document.getElementById("startQuiz");
const quizBox = document.getElementById("quizBox");

// =====================================
// API HELPER
// =====================================

async function apiFetch(endpoint = "", options = {}, retries = API_CONFIG.MAX_RETRIES) {

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, API_CONFIG.TIMEOUT_MS);

    try {

        const response = await fetch(API_CONFIG.BASE_URL + endpoint, {

            headers: {
                "Content-Type": "application/json"
            },

            signal: controller.signal,

            ...options

        });

        clearTimeout(timeout);

        const text = await response.text();

        let data;

        try {

            data = JSON.parse(text);

        } catch {

            data = {
                success: false,
                message: "Invalid server response."
            };

        }

        return {

            ok: response.ok,
            status: response.status,
            data

        };

    } catch (error) {

        clearTimeout(timeout);

        if (error.name === "AbortError") {

            return {

                ok: false,
                status: 0,

                data: {
                    success: false,
                    message: "Server is waking up. Please wait..."
                }

            };

        }

        if (retries > 0) {

            await new Promise(resolve => setTimeout(resolve, 2000));

            return apiFetch(endpoint, options, retries - 1);

        }

        return {

            ok: false,
            status: 0,

            data: {
                success: false,
                message: "Unable to connect to server."
            }

        };

    }

}

// =====================================
// ERROR HELPERS
// =====================================

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