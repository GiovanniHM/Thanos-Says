//Buttons 
const sRed = document.getElementById("sRed");
const sGreen = document.getElementById("sGreen");
const sOrange = document.getElementById("sOrange");
const sPurple = document.getElementById("sPurple");
const sYellow = document.getElementById("sYellow");
const sBlue = document.getElementById("sBlue");
const btnPlay = document.getElementById("btnPlay");
//Sounds
const sound_do = document.getElementById('sound_do')
const sound_re = document.getElementById('sound_re')
const sound_mi = document.getElementById('sound_mi')
const sound_fa = document.getElementById('sound_fa')
const sound_sol = document.getElementById('sound_sol')
const sound_la = document.getElementById('sound_la')
const finalLevel = 10;
//Builder
class Game {
  constructor() {
    this.start = this.start.bind(this);
    this.start();
    this.generateSequence();
    setTimeout(this.nextLevel, 500);
  }
//Start the sequence
  start() {
    this.nextLevel = this.nextLevel.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.toggleBtnGo();
    this.level = 1;
    this.stones = {
      sRed,
      sGreen,
      sOrange,
      sPurple,
      sYellow,
      sBlue
    };
    this.sounds={
      sound_do,
        sound_re,
        sound_mi,
        sound_fa,
        sound_sol,
        sound_la
    }
  }
// Turn on and off
  toggleBtnGo() {
    if (btnPlay.classList.contains("hide")) {
      btnPlay.classList.remove("hide");
    } else {
      btnPlay.classList.add("hide");
    }
  }
  //Generate random sequence
  generateSequence() {
    this.sequence = new Array(finalLevel)
      .fill(0)
      .map(n => Math.floor(Math.random() * 6));
  }

  nextLevel() {
    this.sublevel = 0;
    this.illuminateSequence();
    this.addedEventsClic();
  }
 
  trasformNumberToColor(number) {
    switch (number) {
      case 0:
        return "sRed";
      case 1:
        return "sGreen";
      case 2:
        return "sOrange";
      case 3:
        return "sPurple";
      case 4:
        return "sYellow";
      case 5:
        return "sBlue";
    }
  }

  trasformColorToNumber(color) {
    switch (color) {
      case "sRed":
        return 0;
      case "sGreen":
        return 1;
      case "sOrange":
        return 2;
      case "sPurple":
        return 3;
      case "sYellow":
        return 4;
      case "sBlue":
        return 5;
    }
  }

  playSound(color){
    switch(color){
        case 'sRed':
        this.sounds.sound_do.play()
        break;
        case 'sGreen':
        this.sounds.sound_re.play()
        break;
        case 'sOrange':
        this.sounds.sound_sol.play()
        break;
        case 'sPurple':
        this.sounds.sound_fa.play()
        break;
        case 'sYellow':
        this.sounds.sound_mi.play()
        break;
        case 'sBlue':
        this.sounds.sound_la.play()
        break;
    }
}
  illuminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.trasformNumberToColor(this.sequence[i]);
      setTimeout(() => this.playSound(color), 1000 * i);
      setTimeout(() => this.illuminateColor(color), 1000 * i);
    }
  }
  illuminateColor(color) {
    this.stones[color].classList.add("light");
    setTimeout(() => this.offColor(color), 350);
  }
  offColor(color) {
    this.stones[color].classList.remove("light");
  }
  addedEventsClic() {
    this.stones.sRed.addEventListener("click", this.chooseColor);
    this.stones.sGreen.addEventListener("click", this.chooseColor);
    this.stones.sOrange.addEventListener("click", this.chooseColor);
    this.stones.sPurple.addEventListener("click", this.chooseColor);
    this.stones.sYellow.addEventListener("click", this.chooseColor);
    this.stones.sBlue.addEventListener("click", this.chooseColor);
  }
  removeEventosClick() {
    this.stones.sRed.removeEventListener("click", this.chooseColor);
    this.stones.sGreen.removeEventListener("click", this.chooseColor);
    this.stones.sOrange.removeEventListener("click", this.chooseColor);
    this.stones.sPurple.removeEventListener("click", this.chooseColor);
    this.stones.sYellow.removeEventListener("click", this.chooseColor);
    this.stones.sBlue.removeEventListener("click", this.chooseColor);
  }

  chooseColor(ev) {
    const nameColor = ev.target.dataset.color;
    const numberColor = this.trasformColorToNumber(nameColor);
    this.illuminateColor(nameColor);
    this.playSound(nameColor);

    if (numberColor === this.sequence[this.sublevel]) {
      this.sublevel++;
      if (this.sublevel === this.level) {
        this.level++;
        this.removeEventosClick();
        if (this.level === finalLevel + 1) {
          this.wingame();
        } else {
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      this.gameOver();
    }
  }
  wingame() {
    swal("I am Iron Man", "You win", "success").then(() => {
      this.start();
    });
  }
  gameOver() {
    swal("I am inevitable", "GAME OVER", "error").then(() => {
      this.removeEventosClick();
      this.start();
    });
  }
}

function playGame() {
  window.game = new Game();
}
