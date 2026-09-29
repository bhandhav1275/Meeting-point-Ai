const API_URL = "http://127.0.0.1:8000";


// ========================================
// PAGE NAVIGATION
// ========================================

function showPage(pageName, button) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
    });


    document
        .getElementById(pageName)
        .classList.remove("hidden");


    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });


    button.classList.add("active");
}


// ========================================
// SAVE MEETING
// POST /meeting
// ========================================

async function saveMeeting() {

    const text =
        document.getElementById("meetingText").value.trim();

    const message =
        document.getElementById("saveMessage");


    if (!text) {

        message.style.display = "block";

        message.style.background = "#351b1b";

        message.style.color = "#ff8b8b";

        message.textContent =
            "Please enter meeting information.";

        return;
    }


    message.style.display = "block";

    message.style.background = "#171d35";

    message.style.color = "#aeb9d2";

    message.textContent =
        "Saving meeting memory...";


    try {

        const response = await fetch(
            API_URL + "/meeting",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail || "Unable to save meeting"
            );
        }


        message.style.background = "#10291f";

        message.style.color = "#61e89a";

        message.textContent =
            "✓ " + data.message;

    }

    catch (error) {

        message.style.background = "#351b1b";

        message.style.color = "#ff8b8b";

        message.textContent =
            "✕ Error: " + error.message;

        console.error(error);
    }
}



// ========================================
// RECALL MEMORY
// POST /recall
// ========================================

async function recallMemory() {

    const question =
        document.getElementById("recallQuestion")
            .value
            .trim();


    const loading =
        document.getElementById("recallLoading");

    const resultBox =
        document.getElementById("recallResult");

    const content =
        document.getElementById("recallContent");


    if (!question) {

        alert("Please enter a question.");

        return;
    }


    loading.classList.remove("hidden");

    resultBox.classList.add("hidden");


    try {

        const response = await fetch(
            API_URL + "/recall",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail || "Recall failed"
            );
        }


        content.innerHTML = "";


        if (!data.results || data.results.length === 0) {

            content.innerHTML =
                "<div class='result-item'>No memories found.</div>";

        }

        else {

            data.results.forEach(function(item) {

                const div =
                    document.createElement("div");

                div.className = "result-item";


                div.innerHTML =
                    "<strong>" +
                    escapeHTML(item.type) +
                    "</strong><br>" +
                    escapeHTML(item.text);


                content.appendChild(div);

            });

        }


        resultBox.classList.remove("hidden");

    }

    catch (error) {

        content.innerHTML =
            "<div class='result-item'>" +
            "Error: " +
            escapeHTML(error.message) +
            "</div>";

        resultBox.classList.remove("hidden");

        console.error(error);
    }


    finally {

        loading.classList.add("hidden");

    }
}



// ========================================
// PREPARE MEETING
// POST /prepare
// ========================================

async function prepareMeeting() {

    const question =
        document.getElementById("prepareQuestion")
            .value
            .trim();


    const loading =
        document.getElementById("prepareLoading");

    const resultBox =
        document.getElementById("prepareResult");

    const content =
        document.getElementById("prepareContent");


    if (!question) {

        alert("Please enter your meeting question.");

        return;
    }


    loading.classList.remove("hidden");

    resultBox.classList.add("hidden");


    try {

        const response = await fetch(
            API_URL + "/prepare",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail || "Preparation failed"
            );
        }


        content.innerHTML =
            "<div class='result-item'>" +
            formatResponse(data.response) +
            "</div>";


        resultBox.classList.remove("hidden");

    }

    catch (error) {

        content.innerHTML =
            "<div class='result-item'>" +
            "Error: " +
            escapeHTML(error.message) +
            "</div>";

        resultBox.classList.remove("hidden");

        console.error(error);
    }


    finally {

        loading.classList.add("hidden");

    }
}



// ========================================
// FORMAT AI RESPONSE
// ========================================

function formatResponse(text) {

    if (!text) {
        return "No response received.";
    }


    return escapeHTML(text)
        .replace(/\n/g, "<br>")
        .replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );
}



// ========================================
// SECURITY
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}