const $ = require('jquery'); 

$(() => {
  $.ajax('/data/newest.json', {
    success: (poolData) => {
      setCssVars(poolData[0].results);
      setPercentValues(poolData[0].results);
    }
  })
});

function setCssVars(results) {
  const total = results.reduce((total, result) => (total + result.score), 0);

  $('#css-result-vars').text(':root {\n' +
    results.sort().reduce((style, result, index) => {

      return style + `--score-${result.party}: ${result.score};\n--order-${result.party}: ${index + 1};\n--rotate-${result.party}: ${Math.round(-15 + Math.random() * 30)}deg;\n`;
    }, `--score-total: ${total};\n`)
    + '}');
}

function setPercentValues(results) {
  for (const result of results) {
    const percentEl = $(`.party--${result.party} .party__percent`);
    percentEl.text(`${(result.score * 100).toFixed(1)}%`.replace('.', ','))
  }
}
