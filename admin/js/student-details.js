if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// Get student ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadStudent() {
    try {
        const response = await fetch(`http://localhost:5000/api/applications/${id}`);
        const result = await response.json();

        if (!result.success) {
            alert("Student not found");
            return;
        }

        const student = result.data;

        document.getElementById("full_name").textContent = student.full_name;
        document.getElementById("mobile").textContent = student.mobile;
        document.getElementById("email").textContent = student.email;
        document.getElementById("state").textContent = student.state;
        document.getElementById("neet").textContent = student.neet_qualified;
        document.getElementById("score").textContent = student.neet_score;

    } catch (error) {
        console.error(error);
        alert("Error loading student details");
    }
}

loadStudent();

document.getElementById("editBtn").addEventListener("click", () => {
    window.location.href = `edit-student.html?id=${id}`;
});