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

            default: return;  //$("#flechas").hide();  Si toca otra cosa salga de los movimientos
        }
            //eventokd.preventDefault(); //el evento pierde valor al llamar el preventDefault, no hace falta
            setTimeout(self.chequeamosSiGano.bind(self),150); //Para que no me pare el script el alert y se ejecute dsp de tanto tiempo por mi
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
    this.premio();
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
            setTimeout(function(){
        animacion(contador-1,that);
      },25);
    };
    
  },
  iniciar(el){
    this.instalarPiezas(el);
    this.capturarTeclas();
    this.mezclarFichas(95);
    //this.pepito();
  },
  /*pepito: function(){
    setTimeout(function(){ 
       $('#flechas').hide();}, 30)
  },*/
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
  premio(){
    $("#cartelPremio").css("opacity","100");
    $("#cronoPausado").css("opacity","100");

      var minutos = $("#minutos").text();
      var segundos = $("#segundos").text();
      var centesimas = $("#centesimas").text();

      if((( this.min * 60 ) + this.seg) < 30){
        $("#estrellaIzq").attr("src","piezas/estrella1Rellena.png");
        $("#estrellaMed").attr("src","piezas/estrella2Rellena.png");
        $("#estrellaDer").attr("src","piezas/estrella3Rellena.png");

      }else if((( this.min * 60 ) + this.seg) < 90){
        $("#estrellaIzq").attr("src","piezas/estrella1Rellena.png");
        $("#estrellaMed").attr("src","piezas/estrella2Rellena.png");

      } else {
        console.log(this.min) 
        console.log(this.seg)
        $("#estrellaIzq").attr("src","piezas/estrella1Rellena.png");

      }
      
    $("#cronoPausado").html(minutos + segundos + centesimas);
    $("#cronoPausado").css({'margin-right':'auto','margin-left':'auto','font-size':'30px'});

  $(document).ready(function(){
$("#reiniciarJuego").click(function() { 
location.reload()
})
})


 

$(document).ready(function(){
    $("#myBtn").ready(function(){
        $("#myModal").modal();
    });
});


  
  }
  }

  $(document).ready(function(){
    var Numero1 = $(".Numero1");
    var Numero2 = $(".Numero2");
    var Numero3 = $(".Numero3");
    var Mensaje = $(".Mensaje");

    setTimeout(function(){

    Mensaje.fadeOut(100);}, 2000)
    Numero1.hide()
     Numero2.hide()
      Numero3.hide().fadeIn().fadeOut();

         setTimeout(function(){
        Numero2.fadeIn().fadeOut();}, 700);

         setTimeout(function(){
      Numero1.fadeIn().fadeOut();}, 1400);

$(function() {
$( "#premio" ).ready(function() { $("button.close").hide(); });
});


  });

$(function(){
  var elemento = $('#juego');
  juego.iniciar(elemento);  /* para saber el which de cada tecla
  $(document).keydown(function(event){
	console.log(event);
*/
});
