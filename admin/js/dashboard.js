async function loadStudents() {
    try {
        const response = await fetch("http://localhost:5000/api/applications");
        const result = await response.json();

        if (!result.success) {
            alert("Failed to load students");
            return;
        }

        const students = result.data;

        document.getElementById("totalStudents").textContent = students.length;

        const table = document.getElementById("studentTable");
        table.innerHTML = "";

        students.forEach(student => {
            table.innerHTML += `
                <tr>
                    <td>${student.full_name}</td>
                    <td>${student.mobile}</td>
                    <td>${student.email}</td>
                    <td>Pending</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

loadStudents();