class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
        this.results = results;
    }

    reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
      this.print();
    }

    print() {
      this.display.innerText = this.format(this.times);
    }

    format(times) {
       return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
      if (!this.running) {
        this.running = true;
        this.watch = setInterval( () => this.step(), 10);
      }
    }

    step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }

    calculate() {
      this.times.miliseconds += 1;
      if (this.times.miliseconds >= 100) {
          this.times.seconds += 1;
          this.times.miliseconds = 0;
      }
      if (this.times.seconds >= 60) {
          this.times.minutes += 1;
          this.times.seconds = 0;
      }
    }

    stop() {
      if (this.running){this.add(this.format(this.times))};
      this.running = false;
      clearInterval(this.watch);
    }

    add(times) {
      let listLi = document.createElement('li');
      listLi.innerText = times;
      this.results.appendChild(listLi);
    }

    resetList() {
      this.results.innerText = '';
    }

}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

let resetListBtn = document.getElementById('reset-list');
resetListBtn.addEventListener('click', () => stopwatch.resetList());

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
