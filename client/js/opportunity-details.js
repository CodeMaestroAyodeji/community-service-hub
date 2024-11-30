document.addEventListener("DOMContentLoaded", function () {
    // Attach the logout listener for all pages  
    attachLogoutListener();  
    
    const urlParams = new URLSearchParams(window.location.search);
    const opportunityId = urlParams.get("id");

    const titleEl = document.getElementById("title");
    const descriptionEl = document.getElementById("description");
    const locationEl = document.getElementById("location");
    const dateEl = document.getElementById("date");
    const contactInfoEl = document.getElementById("contactInfo");
    const sendMessageBtn = document.getElementById("sendMessageBtn");

    // Fetch Opportunity Details
    fetch(`http://localhost:5000/api/opportunities/${opportunityId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                Swal.fire({
                    title: "Error!",
                    text: data.error,
                    icon: "error",
                    confirmButtonText: "Okay",
                }).then(() => {
                    window.location.href = "opportunities.html";
                });
            } else {
                titleEl.textContent = data.title;
                descriptionEl.textContent = data.description;
                locationEl.textContent = data.location;
                dateEl.textContent = new Date(data.date).toLocaleDateString();
                contactInfoEl.textContent = data.contact_info;
            }
        })
        .catch((error) => {
            console.error("Error fetching opportunity details:", error);
            Swal.fire({
                title: "Error!",
                text: "Unable to fetch opportunity details. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay",
            });
        });

    // Handle Send Message
    sendMessageBtn.addEventListener("click", () => {
        Swal.fire({
            title: "Send a Message",
            input: "textarea",
            inputLabel: "Message",
            inputPlaceholder: "Write your message here...",
            inputAttributes: {
                "aria-label": "Write your message here",
            },
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed && result.value.trim()) {
                const message = result.value;

                fetch("http://localhost:5000/api/messages/send", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ message, opportunity_id: opportunityId }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.message) {
                            Swal.fire({
                                title: "Success!",
                                text: "Your message has been sent.",
                                icon: "success",
                                confirmButtonText: "Okay",
                            });
                        } else {
                            Swal.fire({
                                title: "Error!",
                                text: data.error || "Unable to send message.",
                                icon: "error",
                                confirmButtonText: "Okay",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error sending message:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong. Please try again later.",
                            icon: "error",
                            confirmButtonText: "Okay",
                        });
                    });
            }
        });
    });
});
