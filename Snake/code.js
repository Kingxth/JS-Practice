const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");
const selcolor = document.getElementById("color");
const selfruta = document.getElementById("fruta");

const tamano = 20;
const limite = 20;

let snake = [{x: 10, y: 10}];
let fruta = {x: 5, y: 5};
let dx = 1, dy = 0;

function nuevafruta() {
  fruta = {
    x: Math.floor(Math.random() * limite),
    y: Math.floor(Math.random() * limite)
  };
}

function reiniciar() {
  snake = [{x: 10, y: 10}];
  dx = 1; dy = 0;
  nuevafruta();
}

function bucle() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};

  const choca_muro = head.x < 0 || head.x >= limite || head.y < 0 || head.y >= limite;
  const choca_cuerpo = snake.some(s => s.x === head.x && s.y === head.y);

  if (choca_muro || choca_cuerpo) return reiniciar();

  snake.unshift(head);

  if (head.x === fruta.x && head.y === fruta.y) {
    nuevafruta();
  } else {
    snake.pop();
  }

  ctx.clearRect(0, 0, 400, 400);

  ctx.fillStyle = selfruta.value;
  ctx.fillRect(fruta.x * tamano + 1, fruta.y * tamano + 1, tamano - 2, tamano - 2);

  ctx.fillStyle = selcolor.value;
  snake.forEach(s => ctx.fillRect(s.x * tamano + 1, s.y * tamano + 1, tamano - 2, tamano - 2));
}

window.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
  if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
  if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
  if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
});

setInterval(bucle, 100);