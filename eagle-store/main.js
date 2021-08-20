const { app, BrowserWindow } = require('electron');

app.on('ready', ()=>{
    let janela = new BrowserWindow({
        width: 800,
        height: 600
    });
    janela.loadURL(`file://${__dirname}/app/index.html`)
});

app.on('window-all-closed', ()=>{
    if(process.platform != 'darwin') app.quit();
})