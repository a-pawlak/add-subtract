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
  equalSignEl = document.querySelector('.equal-sign');
  form = document.querySelector('.form');
  stat1El = document.querySelector('.stat-1');
  stat2El = document.querySelector('.stat-2');
  stat3El = document.querySelector('.stat-3');
  stat4El = document.querySelector('.stat-4');
  level = 15; // easy
  operator = true; // adding
  num1;
  num2;
  result;
  formActive = true;
  addHardStats = 0;
  addEasyStats = 0;
  subHardStats = 0;
  subEasyStats = 0;

  constructor() {
    this.addHardStats = this.getStats()[2] ?? 0;
    this.addEasyStats = this.getStats()[1] ?? 0;
    this.subHardStats = this.getStats()[4] ?? 0;
    this.subEasyStats = this.getStats()[3] ?? 0;
    this.userInput.focus();
    this.levelsListener();
    this.operatorsListener();
    this.formListener();
    this.renderSample();
    this.renderStats();
  }

  renderSample() {
    [this.num1, this.num2, this.result] = new NumbersGenerator(
      this.level,
      this.operator
    ).sample;
    this.firstNumberEl.textContent = this.num1;
    this.secondNumberEl.textContent = this.num2;
    this.operatorEl.textContent = this.operator ? '+' : '-';
  }

  checkInput() {
    return +this.userInput.value === this.result;
  }

  updateStats() {
    if (this.operator) {
      this.level === 15 ? (this.addEasyStats += 1) : (this.addHardStats += 1);
      return;
    }
    this.level === 15 ? (this.subEasyStats += 1) : (this.subHardStats += 1);
  }

  appLogicHandler(e) {
    e.preventDefault();
    if (!this.formActive || this.userInput.value === '') return;
    this.formActive = false;
    const correct = this.checkInput();
    this.userInput.classList.add(`${correct ? 'correct-res' : 'wrong-res'}`);
    if (!correct) this.equalSignEl.textContent = `=${this.result}`;

    setTimeout(() => {
      this.formActive = true;
      this.userInput.classList.remove('correct-res');
      this.userInput.classList.remove('wrong-res');
      this.userInput.value = '';
      this.equalSignEl.textContent = '=';
      if (correct) {
        this.updateStats();
        this.safeStats();
        this.renderStats();
      }
      this.renderSample();
    }, 2500);
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
    this.renderSample();
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
    this.renderSample();
    this.userInput.focus();
  }

  manageActiveClass(el1, el2, e) {
    e.preventDefault();
    if (!e.target.closest('.icon')) return;
    [el1, el2].forEach(el => el.classList.remove('icon-active'));
    e.target.closest('.icon').classList.add('icon-active');
  }

  getToday() {
    const today = new Date();
    const date = `${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`;
    return date + '';
  }

  safeStats() {
    const date = this.getToday();
    const safedObj = JSON.stringify({
      data: [
        date,
        this.addEasyStats,
        this.addHardStats,
        this.subEasyStats,
        this.subHardStats,
      ],
    });
    localStorage.setItem('simplemath', safedObj);
  }

  getStats() {
    const data = JSON.parse(localStorage.getItem('simplemath'));
    if (!data || data.data[0] !== this.getToday()) return 0;
    else return data.data;
  }
  renderStats() {
    this.stat1El.textContent = this.addEasyStats;
    this.stat2El.textContent = this.addHardStats;
    this.stat3El.textContent = this.subEasyStats;
    this.stat4El.textContent = this.subHardStats;
  }
}

const newApp = new App();
