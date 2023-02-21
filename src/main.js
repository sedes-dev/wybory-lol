const $ = require('jquery'); 
const config = require("config");

$(() => {
  $.ajax(config.reqUrl, {
    dataType: 'JSON',
    success: (poolData) => {
      setCssVars(poolData[0].results);
      setPercentValues(poolData[0].results);
      setPoolInfo(poolData[0].provider, poolData[0].date);
      setWinner(poolData[0].results);
      setLoadedState();
    }
  })
});

function setCssVars(results) {
  const total = results.reduce((total, result) => (total + result.score), 0);

  $('#css-result-vars').text(':root {\n' +
    results.sort((r1, r2) => {
      if (r1.score > r2.score) return -1;
      if (r1.score < r2.score) return 1;
      return 0;
    }).reduce((style, result, index) => {
      return style + `--score-${result.party}: ${result.score};\n--order-${result.party}: ${index + 1};\n--rotate-${result.party}: ${Math.round(-15 + Math.random() * 30)}deg;\n`;
    }, `--score-total: ${total};\n--score-top: ${results.sort()[0].score};\n`)
    + '}');
}

function setPercentValues(results) {
  for (const result of results) {
    const percentEl = $(`.party--${result.party} .party__percent`);
    percentEl.text(`${(result.score * 100).toFixed(1)}%`.replace('.', ','))
  }
}

function setPoolInfo(providerName, dateString) {
  const date = new Date(dateString).toLocaleDateString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric'})
  $('.pool-info').text(`${providerName} (${date})`);
}

function setWinner(results) {
  const koScore = results.find(result => result.party === 'ko')?.score || 0;
  const pisScore = results.find(result => result.party === 'pis')?.score || 0;

  if (koScore > pisScore) {
    setAlternativeImages();
  }
}

function setAlternativeImages() {
  $('.party--pis .party__head')
    .attr('src', '/static/kaczynski_worried.png')
    .attr('alt', 'Obrazek przedstawiający niedowierzającą twarz Jarosława Kaczyńskiego');
  $('.party--ko .party__head')
    .attr('src', '/static/tusk_happy.png')
    .attr('alt', 'Obrazek przedstawiający zadowoloną twarz Donalda Tuska.');
}

function setLoadedState() {
  $('.chart').addClass('chart--loaded');
}
