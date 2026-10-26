
const projectsButton = document.getElementById("projects-button");

if (projectsButton) {
    projectsButton.addEventListener("click", function (event) {
        event.preventDefault();
        alert("The Projects section is coming soon!");
    });
}


const contactModal = document.getElementById("contactModal");
const openContactButton = document.getElementById("openContactForm");
const closeContactButton = document.getElementById("closeContactForm");
const contactBackdrop = document.getElementById("contactBackdrop");
const contactForm = document.getElementById("portfolioContactForm");
const contactStatus = document.getElementById("contactStatus");
const contactSubmit = document.getElementById("contactSubmit");

function openContactModal() {
    contactModal.classList.add("active");
    contactModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("contact-modal-open");
    document.getElementById("contactName").focus();
}

function closeContactModal() {
    contactModal.classList.remove("active");
    contactModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("contact-modal-open");
}

openContactButton?.addEventListener("click", openContactModal);
closeContactButton?.addEventListener("click", closeContactModal);
contactBackdrop?.addEventListener("click", closeContactModal);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contactModal.classList.contains("active")) {
        closeContactModal();
    }
});

contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    contactStatus.textContent = "";
    contactSubmit.disabled = true;
    contactSubmit.textContent = "Sending...";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            contactStatus.textContent =
                "Message sent successfully! Thank you for reaching out.";
            contactForm.reset();
        } else {
            contactStatus.textContent =
                "We couldn't send your message. Please check the form setup and try again.";
        }
    } catch (error) {
        contactStatus.textContent =
            "Connection error. Please check your internet connection and try again.";
    } finally {
        contactSubmit.disabled = false;
        contactSubmit.innerHTML = 'Send Message <span>↗</span>';
    }
});
