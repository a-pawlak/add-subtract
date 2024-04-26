class NumbersGenerator {
  num1;
  num2;
  operator;
  constructor(level, operator) {
    this.operator = operator;
    this.num1 = this.generate(level);
    this.num2 = this.generate(level);
  }
  generate(lev) {
    return Math.floor(Math.random() * lev) + 1;
  }
  get sample() {
    if (this.operator === true) {
      const result = this.num1 + this.num2;
      const sampleNumbers = [this.num1, this.num2, result];
      return sampleNumbers;
    }
    if (this.operator === false) {
      const result = this.num1 + this.num2;
      const sampleNumbers = [result, this.num1, this.num2];
      return sampleNumbers;
    }
  }
}

class App {
  iconPlus = document.querySelector('.icon-plus');
  iconMinus = document.querySelector('.icon-minus');
  iconHard = document.querySelector('.icon-hard');
  iconEasy = document.querySelector('.icon-easy');
  operators = document.querySelector('.operators');
  levels = document.querySelector('.levels');
  userInput = document.querySelector('.result');
  firstNumberEl = document.querySelector('.first-number');
  operatorEl = document.querySelector('.operator');
  secondNumberEl = document.querySelector('.second-number');
  form = document.querySelector('.form');
  level = 15; // easy
  operator = true; // adding
  num1;
  num2;
  result;

  constructor() {
    this.userInput.focus();
    this.levelsListener();
    this.operatorsListener();
    this.formListener();
  }

  renderSample() {
    this.firstNumberEl.textContent = this.num1;
    this.secondNumberEl.textContent = this.num2;
    this.operatorEl.textContent = this.operator ? '+' : '-';
  }

  appLogicHandler(e) {
    e.preventDefault();
    [this.num1, this.num2, this.result] = new NumbersGenerator(
      this.level,
      this.operator
    ).sample;

    this.renderSample();
  }

  formListener() {
    this.form.addEventListener('submit', this.appLogicHandler.bind(this));
  }

  levelsListener() {
    this.levels.addEventListener('click', this.levelsManager.bind(this));
  }
  levelsManager(e) {
    this.manageActiveClass(this.iconEasy, this.iconHard, e);
    e.target.closest('.icon-easy') ? (this.level = 15) : (this.level = 50);
    this.userInput.focus();
  }

  operatorsListener() {
    this.operators.addEventListener('click', this.operatorsManager.bind(this));
  }
  operatorsManager(e) {
    this.manageActiveClass(this.iconMinus, this.iconPlus, e);
    e.target.closest('.icon-plus')
      ? (this.operator = true)
      : (this.operator = false);
    this.userInput.focus();
  }

  manageActiveClass(el1, el2, e) {
    e.preventDefault();
    if (!e.target.closest('.icon')) return;
    [el1, el2].forEach(el => el.classList.remove('icon-active'));
    e.target.closest('.icon').classList.add('icon-active');
  }
}

const newApp = new App();
