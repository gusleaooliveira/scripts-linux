const { ipcRenderer, shell } = require('electron');
const process = require('process');
const timer = require('./timer')
let data = require('../../data');

let sobre = document.querySelector('#sobre');
let linkElectron = document.querySelector('#linkElectron');
let linkGithub = document.querySelector('#linkGithub');
let versaoElectron = document.querySelector('#versaoElectron');
let linkAlura = document.querySelector('#linkAlura')
let btnPlay = document.querySelector('#btnPlay');
let txtTempo = document.querySelector('#tempo') 
let textoFront = document.querySelector('#textoFront');
let btnCarregar = document.querySelector('#btnCarregar');

if(versaoElectron != null){
    versaoElectron.textContent = process.versions.electron;
}


if(sobre != null){
    sobre.addEventListener('click', function(){
        ipcRenderer.send('sobre')
    });
}

if(linkElectron != null){
    linkElectron.addEventListener('click', function(){
        console.log('Documentação electron')
        shell.openExternal('https://www.electronjs.org/')
    });
}

if(linkGithub != null){
    linkGithub.addEventListener('click', function(){
        console.log('Meu github')
        shell.openExternal('https://github.com/gusleaooliveira/')
    });
}

if(linkAlura != null){
    linkAlura.addEventListener('click', function(){
        console.log('Alura')
        shell.openExternal('https://www.alura.com.br/')
    });
}


if(btnCarregar != null){
    btnCarregar.addEventListener('click', ()=>{
       data.ler(textoFront.value)
            .then((dados)=>{ txtTempo.textContent = dados.tempo })
            .catch((erro)=>{ console.log(`Erro: ${erro}`)})
    })
}



if(btnPlay != null){
    
    let srcs = ['img/play-button.svg', 'img/stop-button.svg']
    let play=false;
    btnPlay.addEventListener('click', function(){
        btnPlay.className = 'btn btnEspecial eggplant';
        let btnImg = document.querySelector('#btnImagem'); 
        
        if(play){
            btnImg.src = srcs[0];
            timer.parar(textoFront.value);
            play=false
        }
        else{
            timer.iniciar(txtTempo)
            play=true
            btnImg.src = srcs[1];
        }
        
    })
}

ipcRenderer.on('selecionado', (e, arquivo)=>{
    textoFront.value = arquivo;
    data.ler(textoFront.value)
            .then((dados)=>{ txtTempo.textContent = dados.tempo })
            .catch((erro)=>{ console.log(`Erro: ${erro}`)})
    
})

