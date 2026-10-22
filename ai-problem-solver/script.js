const problemInput = document.getElementById("problemInput");
const solveBtn = document.getElementById("solveBtn");
const result = document.getElementById("result");
const resultSection = document.getElementById("resultSection");


// ================= AI CHAT =================

solveBtn.addEventListener("click", solveProblem);


async function solveProblem() {

    const problem = problemInput.value.trim();

    if (problem === "") {

        resultSection.style.display = "block";

        result.textContent =
            "⚠️ Tell me what's on your mind first.";

        resultSection.scrollIntoView({
            behavior: "smooth"
        });

        return;
    }


    // Show loading

    resultSection.style.display = "block";

    result.textContent =
        "✦ LifeMate is thinking...\n\nPlease wait a moment.";

    solveBtn.disabled = true;


    try {

        const response = await fetch("/api/solve", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                problem: problem
            })

        });


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "Something went wrong."
            );

        }


        result.textContent = data.solution;


    } catch (error) {

        result.textContent =
            "❌ Something went wrong.\n\n" +
            error.message;

    } finally {

        solveBtn.disabled = false;

    }

}


// ================= ENTER KEY =================

problemInput.addEventListener("keydown", function (event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        solveProblem();

    }

});


// ================= NAVIGATION =================

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(function (item) {

    item.addEventListener("click", function (event) {

        event.preventDefault();

        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });

        item.classList.add("active");

    });

});


// ================= QUICK ACTIONS =================

const quickButtons =
    document.querySelectorAll(".quick-actions button");


quickButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const text = button.textContent.toLowerCase();


        if (text.includes("idea")) {

            problemInput.value =
                "I need some ideas for my future and personal growth.";

        }

        else if (text.includes("problem")) {

            problemInput.value =
                "Help me solve a problem step by step.";

        }

        else if (text.includes("plan")) {

            problemInput.value =
                "Help me make a realistic plan for my goals.";

        }

        else if (text.includes("talk")) {

            problemInput.value =
                "I just want to talk. I'm having a difficult day.";

        }


        problemInput.focus();

    });

});


// ================= HELP CARDS =================

const helpCards =
    document.querySelectorAll(".help-card");


helpCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const category =
            card.querySelector("h3").textContent;


        problemInput.value =
            `I need help with ${category}. Please guide me step by step.`;


        problemInput.focus();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});