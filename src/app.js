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
  level = 15; // easy
  operator = true; // adding
  num1;
  num2;
  result;
  formActive = true;
  todayStats = 0;
  recoordStats = 0;

  constructor() {
    this.todayStats = this.getStats()[1];
    this.recoordStats = this.getStats()[2];
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
    this.todayStats += 1;
    if (this.todayStats > this.recoordStats)
      this.recoordStats = this.todayStats;
    console.log(this.todayStats);
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
    if (e.target.closest('.icon-active')) return;
    this.manageActiveClass(this.iconEasy, this.iconHard, e);
    e.target.closest('.icon-easy') ? (this.level = 15) : (this.level = 50);
    this.renderSample();
    this.userInput.focus();
  }

  operatorsListener() {
    this.operators.addEventListener('click', this.operatorsManager.bind(this));
  }
  operatorsManager(e) {
    if (e.target.closest('.icon-active')) return;
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
      data: [date, this.todayStats, this.recoordStats],
    });
    localStorage.setItem('simplemath', safedObj);
  }

  getStats() {
    const data = JSON.parse(localStorage.getItem('simplemath'));
    if (!data) return [null, 0, 0];
    if (data.data[0] !== this.getToday()) return ['', 0, data.data[2]];
    else return data.data;
  }
  renderStats() {
    this.stat1El.textContent = this.todayStats;
    this.stat2El.textContent = this.recoordStats;
  }
}

const newApp = new App();
