document.getElementById("forgotPasswordForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                Swal.fire({
                    title: "Success!",
                    text: data.message,
                    icon: "success",
                    confirmButtonText: "Okay"
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
