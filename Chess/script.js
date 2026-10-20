const piezas = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]
];

const simbolos = {
    "r": "♜", "n": "♞", "b": "♝", "q": "♛", "k": "♚", "p": "♟",
    "R": "♖", "N": "♘", "B": "♗", "Q": "♕", "K": "♔", "P": "♙",
    "": ""
};

let turno = "blancas";
let selX = null;
let selY = null;

const contenedor = document.getElementById("board");
const textoTurno = document.getElementById("turn-indicator");

function pintarTablero() {
    contenedor.innerHTML = "";
    
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const casilla = document.createElement("div");
            casilla.classList.add("cell");
            
            if ((i + j) % 2 === 0) {
                casilla.classList.add("white-cell");
            } else {
                casilla.classList.add("black-cell");
            }

            casilla.innerText = simbolos[piezas[i][j]];

            if (selX === i && selY === j) {
                casilla.classList.add("selected");
            }

            casilla.onclick = function() {
                clicCasilla(i, j);
            };

            contenedor.appendChild(casilla);
        }
    }
    
    textoTurno.innerText = "Turno: " + turno;
}

function clicCasilla(x, y) {
    let ficha = piezas[x][y];

    if (selX === null && selY === null) {
        if (ficha !== "") {
            let esBlanca = ficha === ficha.toUpperCase();
            if ((turno === "blancas" && esBlanca) || (turno === "negras" && !esBlanca)) {
                selX = x;
                selY = y;
                pintarTablero();
            }
        }
    } else {
        if (selX === x && selY === y) {
            selX = null;
            selY = null;
        } else {
            piezas[x][y] = piezas[selX][selY];
            piezas[selX][selY] = "";
            selX = null;
            selY = null;
            turno = turno === "blancas" ? "negras" : "blancas";
        }
        pintarTablero();
    }
}

pintarTablero();