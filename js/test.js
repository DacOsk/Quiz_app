const POINTS = 1;
var NUM_QUESTIONS = 0;
const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const counterText = document.querySelector("#questionCounter");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector(".progress-bar-full");

let questions = [];
let availableQuestions = [];
let currentQuestion = {};
let score = 0;
let counter = 0;
let acceptingAnswers = false;
let questionIndex = 0;

fetch('php/test.php')
    .then(response => {
        return response.json();
    })
    .then(data => {
        questions = data;
        startGame();
    })
    .catch(err => {
        console.log(err);
    });



startGame = () => {
    availableQuestions = [...questions];
    NUM_QUESTIONS = availableQuestions.length;
    counter = 0;
    score = 0;
    newQuestion();
}

newQuestion = () => {
    if (availableQuestions.length === 0 || counter >= NUM_QUESTIONS) {
        localStorage.setItem('zadnjiRezultat', score);
        localStorage.setItem('brojPitanja', NUM_QUESTIONS);
        //go to end page
        return window.location.assign('end.html');
    }
    counter++;
    counterText.innerText = `${counter}/${NUM_QUESTIONS}`;
    //update progress bar
    progressBarFull.style.width = `${(counter / NUM_QUESTIONS) * 100}%`;

    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['answer' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers || currentQuestion.answered) return;

        acceptingAnswers = false;
        currentQuestion.answered = true;

        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset["number"]);

        const classToApply =
            selectedAnswer === currentQuestion.answer_ok ? "correct" : "incorrect";

        if (classToApply === "correct") incrementScore(POINTS);

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            newQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};