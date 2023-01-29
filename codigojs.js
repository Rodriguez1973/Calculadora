//Declaraciones
const MAXIMO_DIGITOS = 10 //Máximo de dígitos
let resultado //Resultado.
let iniciarOperando //Flag iniciar número en resutadoDisplay.
let existePunto //Flag presencia del punto decimal.
let operador //Operador.
let operando1 //Primer operando.
let igual //Flag que controla si igual fué la ultima operacion.

//-------------------------------------------------------------------------------------------------
//Referencias de los objetos del documento.
const expresionDisplay = document.getElementById('expresion')
const resultadoDisplay = document.getElementById('resultado')

//-------------------------------------------------------------------------------------------------
//Inicializacion.
function inicializacion() {
  expresionDisplay.innerText = ""
  resultado = "0"; //Resultado.
  iniciarOperando = true; //Flag iniciar número en resutadoDisplay.
  existePunto = false; //Flag presencia del punto decimal.
  operador = ""; //Operador.
  operando1 = ""; //Primer operando.
  igual = false
  resultadoDisplay.innerText = resultado
  expresionDisplay.innerText=""
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
function inicializaResultado() {
  if(igual){
    expresionDisplay.innerText=""
  }
  igual = false
  resultado = 0
  existePunto = false; //Flag presencia del punto decimal.
  resultadoDisplay.innerText = resultado;
}

//-------------------------------------------------------------------------------------------------
//Invertir signo.
function invertirSigno() {
  //El resultado no es 0.
  if (resultado != "0") {
    //El primer caracter de la cadena no es -.
    if (resultado.charAt(0) != '-') {
      resultado = "-" + resultado
      //El primer caracter de la cadena es -.
    } else {
      resultado = resultado.substring(1)
    }
    resultadoDisplay.innerText = resultado;
  }
}

//-------------------------------------------------------------------------------------------------
//Procesar que se ha pulsado la tecla igual.
function procesarIgual(textoTecla) {
  //No hay operación pendiente.
  if (operador != "") {
    expresionDisplay.innerText=expresionDisplay.innerText+resultado+"="
    resultado = eval(parseFloat(operando1) + operador + parseFloat(resultado))
    operando1 = ""
    operador = ""
    resultado = resultado.toString()
    igual = true
    resultadoDisplay.innerText = resultado
  }

}

//-------------------------------------------------------------------------------------------------
//Procesar que se ha pulsado la tecla de un número. 
function procesarNumero(textoTecla) {
  if (!igual) {
    //Si es la inicialización.
    if (resultado == "0" || iniciarOperando) {
      resultado = textoTecla //Asigna a  resultado el texto de la tecla pulsada.
      //No es la inicialización.
    } else {
      //Máxima longitud del número.
      if (resultado.length <= MAXIMO_DIGITOS) {
        resultado += textoTecla //Concatena a resultado el texto de la tecla pulsado.
      }
    }
    iniciarOperando = false //El número ha sido inicializado.
    resultadoDisplay.innerText = resultado  //Muestra en el display.
  }
}

//-------------------------------------------------------------------------------------------------
function procesarPunto(textoTecla) {
  if (!igual) {
    //No existe el punto decimal.
    if (!existePunto) {
      resultado += textoTecla //Concatena a resultado el texto de la tecla pulsado.
      existePunto = true;
      iniciarOperando = false //El número ha sido inicializado.
    }
    resultadoDisplay.innerText = resultado  //Muestra en el display.
  }
}

//-------------------------------------------------------------------------------------------------
//Operar.
function operar(textoTecla) {
  //No existe operando previo
  if (operando1 == "") {
    expresionDisplay.innerText=resultado
    operando1 = resultado
    operador = textoTecla
    existePunto = false
    iniciarOperando = true
    expresionDisplay.innerText=resultado+operador
    //Existe un operando previo.
  } else {
    //Existe una expresión iniciada.
    if (operador != "") {
      switch (operador) {
        //Suma
        case "+":
          operando1 = parseFloat(operando1) + parseFloat(resultado)
          break;
        //Resta
        case "-":
          operando1 = parseFloat(operando1) - parseFloat(resultado)
          break;
        //Multiplicación.
        case "*":
          operando1 = parseFloat(operando1) * parseFloat(resultado)
          break;
        //División.
        case "/":
          operando1 = parseFloat(operando1) / parseFloat(resultado)
          break;
      }
      operador = textoTecla;
      expresionDisplay.innerText = operando1 + operador
    } else {
      switch (textoTecla) {
        //Suma
        case "+":
          operando1 = parseFloat(operando1) + parseFloat(resultado)
          break;
        //Resta
        case "-":
          operando1 = parseFloat(operando1) - parseFloat(resultado)
          break;
        //Multiplicación.
        case "*":
          operando1 = parseFloat(operando1) * parseFloat(resultado)
          break;
        //División.
        case "/":
          operando1 = parseFloat(operando1) / parseFloat(resultado)
          break;
      }
      operador = ""
    }
  }
  igual = false
  resultado = "0"
  existePunto = false
  resultadoDisplay.innerText = resultado  //Muestra en el display.
}

//-------------------------------------------------------------------------------------------------
//Ejecución
inicializacion() //Inicializa la calculadora.
pulsarTecla() //Crea todos los eventos click del teclado.