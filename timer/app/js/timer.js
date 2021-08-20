const moment = require('moment');
const { ipcRenderer } = require('electron');
let data = require('../../data');
let timer = null;
let tempo = null;
let segundos = null;

function formatar(segundos){
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
}

module.exports = {
    iniciar(elemento){
        tempo = moment.duration(elemento.textContent);
        segundos = tempo.asSeconds();
        
        clearInterval(timer);
        timer = setInterval(() => {
            segundos++;
            elemento.textContent = formatar(segundos);
        }, 1000);
    },
    
    parar(texto){
        clearInterval(timer);
        ipcRenderer.send('curso-parado', texto, formatar(segundos))
    }
}