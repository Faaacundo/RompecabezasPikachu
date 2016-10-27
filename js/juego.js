var juego = {
  filas:[[],[],[]],
  espacioVacio:{
    fila:2,
    columna:2
  },
  crearPieza(numero,fila, columna){
    var objeto = $('<div>');
        objeto.addClass('pieza');

        objeto.css({
          "backgroundImage":'url(piezas/' + numero + '.jpg)',
          "top": fila * 200,
          "left": columna * 200
        });

    return {
      el:objeto,
      numero:numero,
      filaInicial:fila,
      columnaInicial:columna,
    };
  },

  instalarPiezas(juegoEl){
    var contador = 1;
    for (var fila = 0; fila < 3; fila++) {
      for (var columna = 0; columna < 3; columna++) {
        if(fila == this.espacioVacio.fila && columna == this.espacioVacio.columna) {
          this.filas[fila][columna] = null;
        }else{
          var pieza = this.crearPieza(contador++,fila,columna);
          juegoEl.append(pieza.el);
          this.filas[fila][columna] = pieza;
        }
      }
    }
  return juegoEl;
  },
  moverFichaFilaColumna(ficha,fila,columna){
    ficha.el.css({
      top: fila * 200,
      left: columna * 200
    })
  },
  guardarEspacioVacio(fila,columna){
    this.espacioVacio.fila = fila;
    this.espacioVacio.columna = columna;

    this.filas[fila][columna] = null;
  },
  intercambiarPosicionConEspacioVacio(fila, columna){
    var ficha = this.filas[fila] && this.filas[fila][columna];
    if(ficha){
      this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = ficha;
      this.moverFichaFilaColumna(ficha,this.espacioVacio.fila,this.espacioVacio.columna);
      this.guardarEspacioVacio(fila,columna);
    }
  },
  capturarTeclas(){
    var self = this; //dentro de las funciones hay que cambiarle el nombre para que no tome el this del obj juego base
    $(document).keyup(function(eventokd) {
        switch(eventokd.which) {
            case 37: //Numero del which de cada tecla presionada
              self.moverHaciaLaIzquierda();
            break;

            case 38:
              self.moverHaciaArriba();
            break;

            case 39:
              self.moverHaciaLaDerecha();
            break;

            case 40:
              self.moverHaciaAbajo();
            break;

            default: return; // Si toca otra cosa salga de los movimientos
        }
            //eventokd.preventDefault(); //el evento pierde valor al llamar el preventDefault, no hace falta
            setTimeout(self.chequeamosSiGano.bind(self),150); //Para que no me pare el script el alert y se ejecute dsp de tanto tiempo por mi
        
         // se lo llama para verificar si estan todas correctas
    });

  },
    moverHaciaAbajo(){
    var filaOrigen = this.espacioVacio.fila-1;
    var columnaOrigen = this.espacioVacio.columna;
    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },

  moverHaciaArriba(){
    var filaOrigen = this.espacioVacio.fila+1;
    var columnaOrigen = this.espacioVacio.columna;
    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },

  moverHaciaLaDerecha(){
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen = this.espacioVacio.columna-1;
    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },

  moverHaciaLaIzquierda(){
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen = this.espacioVacio.columna+1;
   this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);
  },

 chequeamosSiGano(){
    for (var filaCorrecta = 0; filaCorrecta < this.filas.length; filaCorrecta++) {
      for (var columnaCorrecta= 0; columnaCorrecta < this.filas.length; columnaCorrecta++) {
        var ficha = this.filas[filaCorrecta][columnaCorrecta];
        
        if (ficha && !(ficha.filaInicial === filaCorrecta && ficha.columnaInicial === columnaCorrecta)){
           return false;
        }
      }
    }
    return alert('GANASTEEEEEEEEEEEEEEE');
  },
  mezclarFichas(veces){
    var that = this;
    var arrayInterno = [that.moverHaciaArriba, that.moverHaciaAbajo, that.moverHaciaLaIzquierda, that.moverHaciaLaDerecha];
    var rand;

    animacion(veces);

    function animacion(contador) {
      if (contador <= 0 ){ return; }
      rand = Math.floor(Math.random() * 4);
      arrayInterno[rand].bind(that)();
      console.log("jiasjdakl");
      setTimeout(function(){
        animacion(contador-1);
      },100);
    }
  },
 iniciar:function(el){
    this.instalarPiezas(el);
    this.capturarTeclas();
    this.mezclarFichas(20);
  },

  }


$(function(){
  var elemento = $('#juego');
  juego.iniciar(elemento);
  

/* para saber el which de cada tecla
  $(document).keydown(function(event){
	console.log(event);
*/
});