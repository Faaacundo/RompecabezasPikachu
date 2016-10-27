var juego = {
  filas:[[],[],[]],
  cent : 0,
  seg : 0,
  min : 0,

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
                setTimeout(function(){ 
     $('#flechas').fadeOut(1000);}, 2000)
            break;

            case 38:
              self.moverHaciaArriba();  
                setTimeout(function(){ 
     $('#flechas').fadeOut(1000);}, 2000) 
            break;

            case 39:
              self.moverHaciaLaDerecha();
                setTimeout(function(){ 
     $('#flechas').fadeOut(1000);}, 2000)
            break;

            case 40:
              self.moverHaciaAbajo();
                setTimeout(function(){ 
     $('#flechas').fadeOut(1000);}, 2000)
            break;

            default: return     this.pepito();  //$("#flechas").hide();  Si toca otra cosa salga de los movimientos
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


     $().ready(function(){
      var flechas = $("#flechas");
      flechas.html("<img src='piezas/flechaAbajo.png'>").fadeIn();
       })
  },

  moverHaciaArriba(){
    var filaOrigen = this.espacioVacio.fila+1;
    var columnaOrigen = this.espacioVacio.columna;
    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);


     $().ready(function(){
      var flechas = $("#flechas");
     flechas.html("<img src='piezas/flechaArriba.png'>").fadeIn();
       })
  },

  moverHaciaLaDerecha(){
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen = this.espacioVacio.columna-1;
    this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);


     $().ready(function(){
      var flechas = $("#flechas");
      flechas.html("<img src='piezas/flechaDerecha.png'>").fadeIn();
       })
  },

  moverHaciaLaIzquierda(){
    var filaOrigen = this.espacioVacio.fila;
    var columnaOrigen = this.espacioVacio.columna+1;
   this.intercambiarPosicionConEspacioVacio(filaOrigen, columnaOrigen);


    $().ready(function(){
      var flechas = $("#flechas");
      flechas.html("<img src='piezas/flechaIzquierda.png'>").fadeIn();
       })
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
    this.parar();
    this.estrellas();
    return swal({   title: "¡GANASTE!",   text: "Píkachu te felicita por que terminaste de armarlo!",  imageUrl: "piezas/thumbs-up.jpg" });
  },
  mezclarFichas(veces){
    var that = this;
    var arrayInterno = [that.moverHaciaArriba, that.moverHaciaAbajo, that.moverHaciaLaIzquierda, that.moverHaciaLaDerecha];
    var rand;

    animacion(veces,that);

    function animacion(contador,that) {
      if (contador <= 0 ){
        that.inicio();
        return; 
      }
      rand = Math.floor(Math.random() * 4);
      arrayInterno[rand].bind(that)();
      console.log("jiasjdakl");
      setTimeout(function(){
        animacion(contador-1,that);
      },25);
    };
    
  },
 iniciar:function(el){
    this.instalarPiezas(el);
    this.capturarTeclas();
    this.mezclarFichas(80);
  },
  pepito: function(){
  setTimeout(function(){ 
     $('#flechas').fadeOut(10);}, 5500)
  
  },
   inicio: function() {
    this.control = setInterval(function() {
  if (this.cent < 99) {
    this.cent++;
    if (this.cent < 10) { this.cent = "0"+this.cent }
    //Centesimas.innerHTML = ":"+this.centesimas;
    $("#centesimas").html(":"+this.cent);
  }
  
  if (this.cent == 99) {
    this.cent = -1;
  }
  
  if (this.cent == 0) {
    this.seg++;
    if (this.seg < 10) { this.seg = "0"+this.seg }
      $("#segundos").html(":"+this.seg);
  }
  
  if (this.seg == 59) {
    this.seg = -1;
  }
  if ( (this.cent == 0)&&(this.seg == 0) ) {
    this.min++;
    if (this.min < 10) { this.min = "0"+this.min };   
     $("#minutos").html(""+this.min);
  }
}.bind(this),10);
},
 parar:function() {
  clearInterval(this.control);
},
estrellas: function(){
         $('.ganaste').fadeIn(10000);
         $('.ganaste').css({"opacity": "1"});
          $('.ganaste').innerHTML=this.min;


         }
       
}




$(function(){
  var elemento = $('#juego');
  juego.iniciar(elemento);  /* para saber el which de cada tecla
  $(document).keydown(function(event){
	console.log(event);
*/
});








