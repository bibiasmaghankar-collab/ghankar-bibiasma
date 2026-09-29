// =========================
// LOAD SAVED QUESTIONS
// =========================

let questions =
    JSON.parse(localStorage.getItem("questions")) || [];


// =========================
// SHOW QUESTION FORM
// =========================

function showQuestionForm() {

    const form =
        document.getElementById("questionForm");

    if (form.style.display === "block") {
        form.style.display = "none";
    } else {
        form.style.display = "block";
    }
}


// =========================
// SAVE QUESTIONS
// =========================

function saveQuestions() {

    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );

    updateQuestionCount();
    displayQuestions();
}


// =========================
// ADD QUESTION
// =========================

function addQuestion() {

    const question =
        document.getElementById("newQuestion")
        .value.trim();

    const option1 =
        document.getElementById("option1")
        .value.trim();

    const option2 =
        document.getElementById("option2")
        .value.trim();

    const option3 =
        document.getElementById("option3")
        .value.trim();

    const option4 =
        document.getElementById("option4")
        .value.trim();

    const correctAnswer =
        document.getElementById("correctAnswer")
        .value;


    // Validate question

    if (
        question === "" ||
        option1 === "" ||
        option2 === "" ||
        option3 === "" ||
        option4 === "" ||
        correctAnswer === ""
    ) {

        alert(
            "Please enter the question, all 4 options and select the correct answer."
        );

        return;
    }


    // Maximum 10 questions

    if (questions.length >= 10) {

        alert(
            "Maximum 10 questions can be added."
        );

        return;
    }


    // Create question object

    const newQuestion = {

        question: question,

        options: [
            option1,
            option2,
            option3,
            option4
        ],

        correctAnswer:
            Number(correctAnswer)

    };


    // Add question

    questions.push(newQuestion);


    // Save

    saveQuestions();


    // Clear form

    document.getElementById("newQuestion")
        .value = "";

    document.getElementById("option1")
        .value = "";

    document.getElementById("option2")
        .value = "";

    document.getElementById("option3")
        .value = "";

    document.getElementById("option4")
        .value = "";

    document.getElementById("correctAnswer")
        .value = "";


    alert(
        "Question added successfully!"
    );
}


// =========================
// DISPLAY QUESTIONS
// =========================

function displayQuestions() {

    const list =
        document.getElementById("questionList");

    list.innerHTML = "";


    if (questions.length === 0) {

        list.innerHTML = `
            <div class="question-card">
                <h3>No Questions Added</h3>
                <p>
                    Click "+ Add Question" to create
                    your first MCQ.
                </p>
            </div>
        `;

        return;
    }


    questions.forEach(
        (q, index) => {

            const questionCard =
                document.createElement("div");

            questionCard.className =
                "question-card";


            questionCard.innerHTML = `

                <div class="question-number">
                    QUESTION ${index + 1}
                </div>

                <h3>
                    ${q.question}
                </h3>

                <div class="faculty-options">

                    <p>
                        A. ${q.options[0]}
                    </p>

                    <p>
                        B. ${q.options[1]}
                    </p>

                    <p>
                        C. ${q.options[2]}
                    </p>

                    <p>
                        D. ${q.options[3]}
                    </p>

                </div>

                <p>
                    <strong>
                        Correct Answer:
                        ${String.fromCharCode(
                            65 + Number(q.correctAnswer)
                        )}
                    </strong>
                </p>

                <button
                    onclick="deleteQuestion(${index})">

                    Delete Question

                </button>

            `;


            list.appendChild(
                questionCard
            );

        }
    );
}


// =========================
// DELETE QUESTION
// =========================

function deleteQuestion(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this question?"
        );


    if (!confirmDelete) {
        return;
    }


    questions.splice(
        index,
        1
    );


    saveQuestions();
}


// =========================
// QUESTION COUNT
// =========================

function updateQuestionCount() {

    document.getElementById(
        "questionCount"
    ).textContent =
        questions.length;
}


// =========================
// PAGE LOAD
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById(
                "questionForm"
            );

        if (form) {
            form.style.display = "none";
        }

        updateQuestionCount();

        displayQuestions();

    }
);
