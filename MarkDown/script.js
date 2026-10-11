const markText = document.getElementById('MarkText');
const showMarkDown = document.getElementById('Show-Markdooown');

markText.addEventListener('input', convertirMarkdown);

function convertirMarkdown() {
    let texto = markText.value;
    
    texto = texto.replace(/&/g, "&amp;");
    texto = texto.replace(/</g, "&lt;");
    texto = texto.replace(/>/g, "&gt;");
    
    texto = texto.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    texto = texto.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    texto = texto.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    
    texto = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    texto = texto.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    texto = texto.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    let lineas = texto.split('\n');
    let enLista = false;
    let resultadoHTML = [];
    
    for (let i = 0; i < lineas.length; i++) {
        let linea = lineas[i];
        
        if (linea.trim().startsWith('- ')) {
            if (!enLista) {
                resultadoHTML.push('<ul>');
                enLista = true;
            }
            let contenido = linea.trim().substring(2);
            resultadoHTML.push('<li>' + contenido + '</li>');
        } else {
            if (enLista) {
                resultadoHTML.push('</ul>');
                enLista = false;
            }
            
            if (linea.trim() !== "" && !linea.startsWith('<h1>') && !linea.startsWith('<h2>') && !linea.startsWith('<h3>')) {
                resultadoHTML.push('<p>' + linea + '</p>');
            } else {
                resultadoHTML.push(linea);
            }
        }
    }
    
    if (enLista) {
        resultadoHTML.push('</ul>');
    }
    
    showMarkDown.innerHTML = resultadoHTML.join('\n');
}