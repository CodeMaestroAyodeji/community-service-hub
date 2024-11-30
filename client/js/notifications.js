document.addEventListener("DOMContentLoaded", function () {
    const notificationsList = document.getElementById("notificationsList");

    const fetchNotifications = () => {
        fetch("http://localhost:5000/api/notifications", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                notificationsList.innerHTML = "";
                if (data.length > 0) {
                    data.forEach((notification) => {
                        const item = document.createElement("div");
                        item.className = "list-group-item";
                        item.innerHTML = `
                            <p>${notification.notification_text}</p>
                            <small>${new Date(notification.created_at).toLocaleString()}</small>
                        `;
                        notificationsList.appendChild(item);
                    });
                } else {
                    notificationsList.innerHTML = `<p class="text-center text-muted">No notifications found.</p>`;
                }
            })
            .catch((error) => {
                console.error("Error fetching notifications:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Unable to fetch notifications. Please try again later.",
                    icon: "error",
                    confirmButtonText: "Okay",
                });
            });
    };

    // Fetch notifications on page load
    fetchNotifications();
});
