loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    localStorage.removeItem("token");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("https://online-webpage-mqpl.onrender.com/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("token", data.token);

            message.style.color = "green";
            message.textContent = "Login Successful!";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        } else {
            message.style.color = "red";
            message.textContent = data.message;
        }

    } catch (error) {
        message.style.color = "red";
        message.textContent = "Server not responding.";
        console.error(error);
    }
});
