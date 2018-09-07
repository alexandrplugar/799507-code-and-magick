'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_STEP = GAP * 2;
var CAPTION_STEP = TEXT_STEP * 1.9;
var TEXT_WIDTH = 90;
var BAR_WIDTH = 40;
var BOTTOM_Y = CLOUD_HEIGHT - GAP;
var CHART_HEIGHT = 150;
var SATURATION_INCREASE = 3;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderHeading = function (ctx, heading, caption) {
  ctx.fillText(heading, CLOUD_X + TEXT_STEP, CLOUD_Y + GAP + TEXT_STEP);
  ctx.fillText(caption, CLOUD_X + TEXT_STEP, CLOUD_Y + GAP + CAPTION_STEP);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRoundNumber = function (number) {
  return Math.floor(number);
};

window.renderStatistics = function (ctx, players, times) {
  var maxTime = getRoundNumber(getMaxElement(times));

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';

  renderHeading(ctx, 'Ура вы победили!', 'Список результатов:');

  players.forEach(function (player, i) {
    var timesRound = getRoundNumber(times[i]);
    var playerChart = getRoundNumber((CHART_HEIGHT * timesRound / maxTime));
    var saturationRandom = i * SATURATION_INCREASE + '0%';

    ctx.fillStyle = (player === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + saturationRandom + ', 50%)';
    ctx.fillRect(CLOUD_X + TEXT_STEP + GAP + (BAR_WIDTH * 2 + GAP) * i, BOTTOM_Y - TEXT_STEP, BAR_WIDTH, -playerChart);

    ctx.fillStyle = '#000';
    ctx.fillText(player, CLOUD_X + GAP + (TEXT_STEP + TEXT_WIDTH * i), BOTTOM_Y);
    ctx.fillText(timesRound, CLOUD_X + GAP + (TEXT_STEP + TEXT_WIDTH * i), BOTTOM_Y - playerChart - TEXT_STEP - GAP);
  });
};
