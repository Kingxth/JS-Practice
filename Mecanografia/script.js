const copyArea = document.getElementById('copy');
const textBox = document.getElementById('text-box');
const accuracyVal = document.getElementById('accuracy-val');
const speedVal = document.getElementById('speed-val');
const lastGame = document.getElementById('lastgame');

let textoOriginal = "";
let indice = 0;
let errores = 0;
let tiempoInicio = null;
let juegoActivo = false;

copyArea.addEventListener('input', () => {
    if (copyArea.value !== "") {
        iniciarJuego(copyArea.value);
    }
});

function iniciarJuego(texto) {
    textoOriginal = texto.trim();
    indice = 0;
    errores = 0;
    tiempoInicio = null;
    juegoActivo = true;
    
    accuracyVal.innerText = "100%";
    speedVal.innerText = "0 PPM";
    textBox.innerHTML = '';
    
    for (let i = 0; i < textoOriginal.length; i++) {
        const span = document.createElement('span');
        span.innerText = textoOriginal[i];
        if (i === 0) {
            span.className = 'current';
        }
        textBox.appendChild(span);
    }
}

window.addEventListener('keydown', (e) => {
    if (!juegoActivo) return;
    
    const spans = textBox.querySelectorAll('span');
    
    if (e.key === 'Backspace') {
        if (indice > 0) {
            spans[indice].className = '';
            indice--;
            if (spans[indice].className === 'incorrect') {
                if (errores > 0) errores--;
            }
            spans[indice].className = 'current';
        }
        return;
    }
    
    if (e.key.length > 1) return;
    
    if (!tiempoInicio) {
        tiempoInicio = new Date();
    }
    
    spans[indice].className = '';
    
    if (e.key === textoOriginal[indice]) {
        spans[indice].className = 'correct';
    } else {
        spans[indice].className = 'incorrect';
        errores++;
    }
    
    indice++;
    
    if (indice < textoOriginal.length) {
        spans[indice].className = 'current';
    } else {
        juegoActivo = false;
        lastGame.innerText = speedVal.innerText + " - " + accuracyVal.innerText;
    }
    
    calcularEstadisticas();
});

function calcularEstadisticas() {
    if (!tiempoInicio || indice === 0) return;
    
    const minutos = (new Date() - tiempoInicio) / 1000 / 60;
    if (minutos > 0) {
        const ppm = Math.round((indice / 5) / minutos);
        speedVal.innerText = ppm + " PPM";
    }
    
    const precision = Math.round(((indice - errores) / indice) * 100);
    accuracyVal.innerText = (precision < 0 ? 0 : precision) + "%"; 
}