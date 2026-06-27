if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// Get student ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Load student data
async function loadStudent() {
    try {
        const response = await fetchfetch(`https://online-webpage-7yxo.onrender.com/api/applications/${id}`);
        const result = await response.json();

        if (!result.success) {
            alert("Student not found");
            return;
        }

        const student = result.data;

        document.getElementById("full_name").value = student.full_name;
        document.getElementById("mobile").value = student.mobile;
        document.getElementById("email").value = student.email;
        document.getElementById("state").value = student.state;
        document.getElementById("neet_qualified").value = student.neet_qualified;
        document.getElementById("neet_score").value = student.neet_score;

    } catch (error) {
        console.error(error);
    }
}

loadStudent();

// Update student
document.getElementById("editForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const student = {
        full_name: document.getElementById("full_name").value,
        mobile: document.getElementById("mobile").value,
        email: document.getElementById("email").value,
        state: document.getElementById("state").value,
        neet_qualified: document.getElementById("neet_qualified").value,
        neet_score: document.getElementById("neet_score").value
    };

    try {
        const response = await fetch(`http://localhost:5000/api/applications/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const result = await response.json();

        if (result.success) {
            alert("Student updated successfully!");
            window.location.href = "dashboard.html";
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error(error);
        alert("Error updating student.");
    }
});