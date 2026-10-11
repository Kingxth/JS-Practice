document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('bakeBtn').addEventListener('click', convertir);
});

function convertir() {
    let texto = document.getElementById('inputData').value.trim();
    let tipo = document.getElementById('recipe').value;
    let resultado = document.getElementById('outputData');
    
    if (!texto) {
        resultado.value = "Escribe algo";
        return;
    }

    try {
        switch (tipo) {
            case 'base64':
                resultado.value = atob(texto);
                break;
            case 'base64encode':
                resultado.value = btoa(texto);
                break;
            case 'url':
                resultado.value = decodeURIComponent(texto);
                break;
            case 'urlencode':
                resultado.value = encodeURIComponent(texto);
                break;
            case 'hex':
                let hex = texto.replace(/0x|\s/g, '');
                let decodificado = '';
                for (let i = 0; i < hex.length; i += 2) {
                    decodificado += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                }
                resultado.value = decodificado;
                break;
            case 'hexencode':
                let codificado = '';
                for (let i = 0; i < texto.length; i++) {
                    codificado += texto.charCodeAt(i).toString(16).padStart(2, '0') + ' ';
                }
                resultado.value = codificado.trim();
                break;
            default:
                resultado.value = "Opción no válida";
        }
    } catch (e) {
        resultado.value = "Error en el formato";
    }
}