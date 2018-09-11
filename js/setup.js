'use strict';

var WIZARD = {
  WIZARDS_COUNT: 5,
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var renderWizardElement = function (wizardData) {
  var wizardElement = {
    name: getRandomArrayElement(wizardData.NAMES) + ' ' + getRandomArrayElement(wizardData.SURNAMES),
    coatColor: getRandomArrayElement(wizardData.COAT_COLORS),
    eyesColor: getRandomArrayElement(wizardData.EYES_COLORS)
  };
  return wizardElement;
};

var createWizardsCollection = function (num) {
  var collections = [];
  for (var i = 0; i < num; i++) {
    collections.push(renderWizardElement(WIZARD));
  }
  return collections;
};

var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWizardsFragment = function (wizardCollection) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardCollection.length; i++) {
    fragment.appendChild(renderWizard(wizardCollection[i]));
  }
  return fragment;
};

var setupGame = function () {
  var setup = document.querySelector('.setup');
  var setupSimilar = document.querySelector('.setup-similar');

  setup.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');

  var wizards = createWizardsCollection(WIZARD.WIZARDS_COUNT);

  var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
  setupSimilarList.appendChild(createSimilarWizardsFragment(wizards));
};

setupGame();
