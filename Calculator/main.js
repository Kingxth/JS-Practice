const digito = document.getElementsByClassName('numero');
const signo = document.getElementsByClassName('signo');
const C = document.getElementById('Cancelar');
const enter = document.getElementById('enter');
const pantalla = document.getElementById('pantalla');

function numero(e) {
    let valor = e.target.textContent;
    pantalla.value += valor;
}

function manejarSigno(e) {
    let operador = e.target.textContent;
    pantalla.value += operador;
}

function borrar(e) {
    pantalla.value = "";
}

function resultado(e) {
    let texto = pantalla.value;
    
    let operadorEncontrado = "";
    for (let i = 0; i < texto.length; i++) {
        let char = texto[i];
        if (char === '+' || char === '-' || char === '*' || char === '/') {
            operadorEncontrado = char;
            break;
        }
    }
    
    if (operadorEncontrado !== "") {
        let partes = texto.split(operadorEncontrado);
        let num1 = parseFloat(partes[0]);
        let num2 = parseFloat(partes[1]);
        let res = 0;
        
        if (operadorEncontrado === '+') {
            res = num1 + num2;
        } else if (operadorEncontrado === '-') {
            res = num1 - num2;
        } else if (operadorEncontrado === '*') {
            res = num1 * num2;
        } else if (operadorEncontrado === '/') {
            res = num2 !== 0 ? num1 / num2 : "Error";
        }
        
        pantalla.value = res;
    }
}

for (let i = 0; i < digito.length; i++) {
    const botonActual = digito[i];
    botonActual.addEventListener('click', numero);
}

for (let i = 0; i < signo.length; i++) {
    const signoActual = signo[i];
    signoActual.addEventListener('click', manejarSigno);
}

C.addEventListener('click', borrar);
enter.addEventListener('click', resultado);