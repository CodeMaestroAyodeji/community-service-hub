document.addEventListener("DOMContentLoaded", function () {
    const totalOpportunitiesEl = document.getElementById("totalOpportunities");
    const messagesReceivedEl = document.getElementById("messagesReceived");
    const notificationsEl = document.getElementById("notifications");

    const updateProfileForm = document.getElementById("updateProfileForm");
    const changePasswordForm = document.getElementById("changePasswordForm");

    const token = localStorage.getItem("token");

    // Fetch Metrics for Organization Dashboard
    fetch("http://localhost:5000/api/metrics/organization", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            totalOpportunitiesEl.textContent = data.totalOpportunities || 0;
            messagesReceivedEl.textContent = data.messagesReceived || 0;
            notificationsEl.textContent = data.notifications || 0;
        })
        .catch((error) => console.error("Error fetching metrics:", error));

    // Update Profile
    updateProfileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("updateName").value;
        const email = document.getElementById("updateEmail").value;

        fetch("http://localhost:5000/api/users/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, email }),
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire("Success", "Profile updated successfully!", "success");
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                Swal.fire("Error", "Failed to update profile.", "error");
            });
    });

    // Change Password
    changePasswordForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const old_password = document.getElementById("currentPassword").value;
        const new_password = document.getElementById("newPassword").value;

        fetch("http://localhost:5000/api/users/password", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ old_password, new_password }),
        })
            .then((response) => response.json())
            .then((data) => {
                Swal.fire("Success", "Password changed successfully!", "success");
            })
            .catch((error) => {
                console.error("Error changing password:", error);
                Swal.fire("Error", "Failed to change password.", "error");
            });
    });
});
