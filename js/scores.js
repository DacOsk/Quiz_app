const highScoresList = document.querySelector('#high-scores-list');
const highScores = JSON.parse(localStorage.getItem('rangLista')) || [];

console.log(highScores);

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join('');