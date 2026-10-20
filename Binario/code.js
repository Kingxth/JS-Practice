const textodecimal = document.getElementById('decimal');
const textobinario = document.getElementById('binario');
const textooctal = document.getElementById('octal');
const textohexa = document.getElementById('hexa');

function convdecimal(){
    let jajas = textodecimal.value;
    let patagonia = Number(jajas);

    if(!isNaN(patagonia)){
        textobinario.value = patagonia.toString(2);
        textooctal.value = patagonia.toString(8);
        textohexa.value = patagonia.toString(16);
    } else {
        textobinario.value = "";
        textooctal.value = "";
        textohexa.value ="";
    }
}

function convbinario(){
    let valordelnumero = textobinario.value;
    let numero = parseInt(valordelnumero, 2);

    if(!isNaN(numero)){
        textodecimal.value = numero.toString(10);
        textooctal.value = numero.toString(8);
        textohexa.value = numero.toString(16);
    } else{
        textodecimal.value = "";
        textooctal.value = "";
        textohexa.value ="";
    }
}

function convoctal(){
    let elvalorintrinseco = textooctal.value;
    let setoma = parseInt(elvalorintrinseco, 8);

    if(!isNaN(setoma)){
        textobinario.value = setoma.toString(2);
        textodecimal.value = setoma.toString(10);
        textohexa.value = setoma.toString(16);

    }else{
        textobinario.value = "";
        textodecimal.value = "";
        textohexa.value= '';
    }
}

function convhexa(){
    let cajitafeliz = textohexa.value;
    let numerodelacajitafeliz = parseInt(cajitafeliz,16);
    
    if(!isNaN(numerodelacajitafeliz)){
        textobinario.value = numerodelacajitafeliz.toString(2);
        textodecimal.value = numerodelacajitafeliz.toString(10);
        textooctal.value = numerodelacajitafeliz.toString(8);
    }else{
        textobinario.value = '';
        textooctal.value = '';
        textodecimal.value = '';
    }

}


textodecimal.addEventListener("input", convdecimal);
textobinario.addEventListener("input", convbinario);
textooctal.addEventListener("input",convoctal);
textohexa.addEventListener("input", convhexa);