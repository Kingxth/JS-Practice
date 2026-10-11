const passwordInput = document.getElementById('password');
const btnGenerar = document.getElementById('generar');
const lvlEntro = document.getElementById('lvl-entro');
const usuarioInput = document.getElementById('usuario');
const testPasswordInput = document.getElementById('testpassword');
const btnVerify = document.getElementById('verify');
const consoleBox = document.getElementById('console');
btnGenerar.addEventListener('click', generarClave);
passwordInput.addEventListener('input', revisarEntropia);
btnVerify.addEventListener('click', iniciarBusqueda);

function generarClave() {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let clave = "";
    
    for (let i = 0; i < 10; i++) {
        let indice = Math.floor(Math.random() * caracteres.length);
        clave += caracteres[indice];
    }
    
    passwordInput.value = clave;
    revisarEntropia();
}

function revisarEntropia() {
    let valor = passwordInput.value.replace(/\s+/g, '');
    
    if (valor.length === 0) {
        lvlEntro.value = "Waiting...";
    } else if (valor.length < 6) {
        lvlEntro.value = "Muy baja";
    } else if (valor.length < 10) {
        lvlEntro.value = "Regular";
    } else {
        lvlEntro.value = "Alta (Buena)";
    }
}

async function iniciarBusqueda() {
    let usuario = usuarioInput.value.trim();
    let passwordObjetivo = testPasswordInput.value.trim();
    
    if (usuario === "" || passwordObjetivo === "") {
        consoleBox.textContent = "Error: Llena el usuario y la contrasena.";
        return;
    }
    
    consoleBox.textContent = "Buscando en rockyou.txt...";
    
    try {
        let respuesta = await fetch('rockyou.txt');
        let texto = respuesta.ok ? await respuesta.text() : "";
        let lineas = texto.split('\n');
        
        let encontrado = false;
        
        for (let i = 0; i < lineas.length; i++) {
            let palabra = lineas[i].trim();
            
            if (palabra === passwordObjetivo) {
                consoleBox.textContent = "Encontrado!\nUsuario: " + usuario + "\nContrasena: " + palabra + "\nLinea: " + (i + 1);
                encontrado = true;
                break;
            }
        }
        
        if (!encontrado) {
            consoleBox.textContent = "No se encontro la contrasena en rockyou.txt";
        }
        
    } catch (error) {
        consoleBox.textContent = "Error al leer el archivo rockyou.txt.";
    }
}