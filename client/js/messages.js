document.addEventListener("DOMContentLoaded", function () {
    // Attach the logout listener for all pages  
    attachLogoutListener();  
    
    const messagesList = document.getElementById("messagesList");

    const fetchMessages = () => {
        fetch("http://localhost:5000/api/messages", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                messagesList.innerHTML = "";
                if (data.messages.length > 0) {
                    data.messages.forEach((message) => {
                        const item = document.createElement("a");
                        item.href = `message-details.html?id=${message.id}`;
                        item.className = "list-group-item list-group-item-action";
                        item.innerHTML = `
                            <h5>Message from Opportunity #${message.opportunity_id}</h5>
                            <p>${message.message}</p>
                            <small>${new Date(message.created_at).toLocaleString()}</small>
                        `;
                        messagesList.appendChild(item);
                    });
                } else {
                    messagesList.innerHTML = `<p class="text-center text-muted">No messages found.</p>`;
                }
            })
            .catch((error) => {
                console.error("Error fetching messages:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Unable to fetch messages. Please try again later.",
                    icon: "error",
                    confirmButtonText: "Okay",
                });
            });
    };

    // Fetch messages on page load
    fetchMessages();
});
