const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

let allStudents = [];

async function loadStudents() {
    try {
        const response = await fetch(
    "https://YOUR-BACKEND.onrender.com/api/applications",
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);
        const result = await response.json();

        if (!result.success) {
            alert("Failed to load students");
            return;
        }

        allStudents = result.data;

        document.getElementById("totalStudents").textContent = allStudents.length;

        displayStudents(allStudents);

    } catch (error) {
        console.error(error);
    }
}

function displayStudents(students) {

    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `
            <tr>
                <td>${student.full_name}</td>
                <td>${student.mobile}</td>
                <td>${student.email}</td>
                <td>Pending</td>
                <td>
                    <button onclick="viewStudent(${student.id})">
                        View
                    </button>
                </td>
            </tr>
        `;
    });

}

function viewStudent(id) {
    window.location.href = `student-details.html?id=${id}`;
}

loadStudents();



document.getElementById("searchInput").addEventListener("keyup", function () {

    const search = this.value.toLowerCase();

    const filtered = allStudents.filter(student =>
        student.full_name.toLowerCase().includes(search) ||
        student.mobile.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search)
    );

    displayStudents(filtered);

});

document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault();

    localStorage.removeItem("adminLoggedIn");
localStorage.removeItem("token");

    window.location.href = "login.html";
});