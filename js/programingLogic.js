const sRed = document.getElementById('sRed');
const sGreen = document.getElementById('sGreen');
const sOrange = document.getElementById('sOrange');
const sPurple = document.getElementById('sPurple');
const sYellow = document.getElementById('sYellow');
const sBlue = document.getElementById('sBlue');
const btnPlay = document.getElementById('btnPlay');
const finalLevel=10;

class Game{
  constructor(){
    this.star= this.star.bind(this)
          this.inicializar()
          this.generarSecuencia()
          setTimeout(this.siguienteNivel,500)

  }

  inicializar() {
    this.nextLevel= this.nextLevel.bind(this)
    this.chooseColor= this.chooseColor.bind(this)
    this.toggleBtnGo()
    this.level=1
    this.stones={
      sRed,
      sGreen,
      sOrange,
      sPurple,
      sYellow,
      sBlue
    }
  }


}