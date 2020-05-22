const submitForm = document.querySelector('#form');
const username = document.querySelector('#username');
const saveBtn = document.querySelector('#save-score-btn');
const mostRecentScore = localStorage.getItem('zadnjiRezultat');
const numQuestions = localStorage.getItem('brojPitanja');
const finalScore = document.querySelector('#final-score');

const highScores = JSON.parse(localStorage.getItem('rangLista')) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = `Rezultat = ${mostRecentScore}/${numQuestions}`;
saveBtn.disabled = !username.value;

username.addEventListener('keyup', () => {
    saveBtn.disabled = !username.value;
});

saveBtn.addEventListener('mouseenter', () => {
    saveBtn.disabled = !username.value;
});

submitForm.addEventListener('submit', e => {
    e.preventDefault();
});

saveBtn.addEventListener('click', () => {
    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    saveBtn.disabled = true;
    username.disabled = true;

    localStorage.setItem('rangLista', JSON.stringify(highScores));
    window.location.assign('index.html');
});