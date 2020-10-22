const quizData = [
    {
        question: "Which built-in method returns the length of the string?",
        a: "length()",
        b: "size()",
        c: "index()",
        d: "None of the above",
        correct: "a",
    },
    {
        question: "Which built-in method sorts the elements of an array?",
        a: "changeOrder(order)",
        b: "sort()",
        c: "order()",
        d: "None of the above",
        correct: "b",
    },
    {
        question: "Which of the following is not JavaScript Data Types?",
        a: "Undefined",
        b: "Number",
        c: "Boolean",
        d: "Float",
        correct: "d",
    },
    {
        question: "Which company developed JavaScript?",
        a: "Netscape",
        b: "Bell Labs",
        c: "Sun Microsystems",
        d: "IBM",
        correct: "a",
    },
    {
        question: "Inside which HTML element do we put the JavaScript",
        a: "<meta>",
        b: "<head>",
        c: "<script>",
        d: "<style>",
        correct: "c",
    },
];

const quesEl = document.querySelector(".question");
const aEl = document.getElementById("a_ans");
const bEl = document.getElementById("b_ans");
const cEl = document.getElementById("c_ans");
const dEl = document.getElementById("d_ans");
const submitBtn = document.querySelector(".btn");
const answerEl = document.querySelectorAll(".answers");
const wrapperEl = document.querySelector(".wrapper");
const timerEl = document.querySelector(".timer");

let currentQuestion = 0;
let currentScore = 0;

loadQuiz();

let timeleft = 10;
let countdownTimer = setInterval(function () {
    if(timeleft <= 0 && currentQuestion == quizData.length-1) {
        clearInterval(countdownTimer)
        return wrapperEl.innerHTML = `<h2 class="over">You have scored ${currentScore}/${quizData.length}</h2><button onclick="location.reload()">Reload</button>`
    }
    if (timeleft <= 0 && currentQuestion < quizData.length-1) {
        currentQuestion += 1
        loadQuiz()
        timeleft = 10
    }
    timerEl.innerText = timeleft;
    timeleft -= 1;
}, 1000);

function clearOptions() {
    answerEl.forEach((ans) => (ans.checked = false));
}

function getAnswers() {
    let answer = undefined;
    answerEl.forEach((ans) => {
        if (ans.checked) {
            answer = ans.id;
        }
    });
    return answer;
}

function loadQuiz() {
    clearOptions();
    const currentQuiz = quizData[currentQuestion];
    quesEl.innerText = currentQuiz.question;
    aEl.innerText = currentQuiz.a;
    bEl.innerText = currentQuiz.b;
    cEl.innerText = currentQuiz.c;
    dEl.innerText = currentQuiz.d;
}

submitBtn.addEventListener("click", () => {
    const answer = getAnswers();
    if (answer) {
        timeleft = 10;
        if (answer === quizData[currentQuestion].correct) {
            currentScore += 1;
        }
        currentQuestion += 1;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            clearInterval(countdownTimer)
            wrapperEl.innerHTML = `<h2 class="over">You have scored ${currentScore}/${quizData.length}</h2><button onclick="location.reload()">Reload</button>`;
        }
    }
});
