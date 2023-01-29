//Declaraciones
const MAXIMO_DIGITOS=10 //Máximo de dígitos
let resultado //Resultado.
let iniciarOperando //Flag iniciar número en resutadoDisplay.
let existePunto //Flag presencia del punto decimal.
let operador //Operador.
let operando1 //Primer operando.

//-------------------------------------------------------------------------------------------------
//Referencias de los objetos del documento.
const expresionDisplay = document.getElementById('expresion')
const resultadoDisplay = document.getElementById('resultado')

//-------------------------------------------------------------------------------------------------
//Inicializacion.
function inicializacion() {
  resultado = "0"; //Resultado.
  iniciarOperando = true; //Flag iniciar número en resutadoDisplay.
  existePunto = false; //Flag presencia del punto decimal.
  operador = ""; //Operador.
  operando1 = ""; //Primer operando.
  resultadoDisplay.innerText = resultado
  mostrarExpresion()
}

//-------------------------------------------------------------------------------------------------
//Creación de los eventos click sobre las teclas de la calculadora.
function pulsarTecla() {
  //El selector css selecciona todos los td de los tr menos del primero que corresponde al display,
  var listaTeclas = document.querySelectorAll("#principal tr:not(:first-child) td");

  for (let i = 0; i < listaTeclas.length; i++) {
    listaTeclas[i].addEventListener("click", accionTecla, false);
  }
}

//-------------------------------------------------------------------------------------------------
//Acción de la tecla de la calculadora.
function accionTecla() {
  let textoTecla = this.innerText //Contenido de la tecla pulsada.

  //La tecla pulsada es un número.
  if (!isNaN(textoTecla)) {
    procesarNumero(textoTecla);
    //Procesar el punto decimal.
  } else if (textoTecla == ".") {
    procesarPunto(textoTecla);
    //Procesar +,-,/,*
  } else if (textoTecla == "+" || textoTecla == "-" || textoTecla == "*" || textoTecla == "/") {
    operar(textoTecla)
  } else if (textoTecla == "=") {
    procesarIgual(textoTecla)
  } else if (textoTecla == "+/-") {
    invertirSigno()
  } else if (textoTecla == "CE") {
    inicializaResultado()
  } else if (textoTecla == "C") {
    inicializacion()
  }
}

//-------------------------------------------------------------------------------------------------
//Inicializa el resultado.
function inicializaResultado(){
  resultado=0
  resultadoDisplay.innerText=resultado;
}

//-------------------------------------------------------------------------------------------------
//Invertir signo.
function invertirSigno() {
  if (resultado.charAt(0) != '-') {
    resultado = "-" + resultado
  } else {
    resultado = resultado.substring(1)
  }
  resultadoDisplay.innerText = resultado;
}

//-------------------------------------------------------------------------------------------------
//Procesar que se ha pulsado la tecla igual.
function procesarIgual(textoTecla) {
  //No hay operación pendiente.
  if (operador != "") {
    resultado = eval(parseFloat(operando1) + operador + parseFloat(resultado))
    operando1 = ""
    operador = ""
    resultado=resultado.toString()
    resultadoDisplay.innerText = resultado
  }
  mostrarExpresion()
}

//-------------------------------------------------------------------------------------------------
//Procesar que se ha pulsado la tecla de un número. 
function procesarNumero(textoTecla) {
  //Si es la inicialización.
  if (resultado == "0" || iniciarOperando) {
    resultado = textoTecla //Asigna a  resultado el texto de la tecla pulsada.
    //No es la inicialización.
  } else {
    //Máxima longitud del número.
    if(resultado.length<=MAXIMO_DIGITOS){
    resultado += textoTecla //Concatena a resultado el texto de la tecla pulsado.
    }
  }
  iniciarOperando = false //El número ha sido inicializado.
  resultadoDisplay.innerText = resultado  //Muestra en el display.
}

//-------------------------------------------------------------------------------------------------
function procesarPunto(textoTecla) {
  //No existe el punto decimal.
  if (!existePunto) {
    resultado += textoTecla //Concatena a resultado el texto de la tecla pulsado.
    existePunto = true;
    iniciarOperando = false //El número ha sido inicializado.
  }
  resultadoDisplay.innerText = resultado  //Muestra en el display.
}

//-------------------------------------------------------------------------------------------------
//Operar.
function operar(textoTecla) {
  //No existe operando previo
  if (operando1 == "") {
    operando1 = resultado
    operador = textoTecla
    existePunto=false
    iniciarOperando = true
    //Existe un operando previo.
  } else {
    switch (textoTecla) {
      //Suma
      case "+":
        operando1 = parseFloat(operando1) + parseFloat(resultado)
        operador = ""
        break;
      //Resta
      case "-":
        operando1 = parseFloat(operando1) - parseFloat(resultado)
        operador = ""
        break;
      //Multiplicación.
      case "*":
        operando1 = parseFloat(operando1) * parseFloat(resultado)
        operador = ""
        break;
      //División.
      case "/":
        operando1 = parseFloat(operando1) / parseFloat(resultado)
        operador = ""
        break;
    }
  }
  resultado = "0"
  resultadoDisplay.innerText = resultado  //Muestra en el display.
  mostrarExpresion()
}

//-------------------------------------------------------------------------------------------------
//
function mostrarExpresion() {
  expresionDisplay.innerText = operando1 + operador
}

//-------------------------------------------------------------------------------------------------
//Ejecución
inicializacion() //Inicializa la calculadora.
pulsarTecla() //Crea todos los eventos click del teclado.
