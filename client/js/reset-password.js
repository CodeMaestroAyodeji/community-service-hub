document.getElementById("resetPasswordForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        Swal.fire({
            title: "Error!",
            text: "Passwords do not match.",
            icon: "error",
            confirmButtonText: "Okay"
        });
        return;
    }

    fetch(`http://localhost:5000/api/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                Swal.fire({
                    title: "Success!",
                    text: data.message,
                    icon: "success",
                    confirmButtonText: "Okay"
                }).then(() => {
                    window.location.href = "login.html";
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: data.error || "An error occurred. Please try again.",
                    icon: "error",
                    confirmButtonText: "Okay"
                });
            }
        })
        .catch(error => {
            console.error("Error:", error);
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay"
            });
        });
});
