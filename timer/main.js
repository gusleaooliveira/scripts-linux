const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data')
const template = require('./template')
let tray = null;

app.on('ready', ()=>{
    let mainWindow =  new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    let menu = template.carregar(mainWindow);
    tray = new Tray(__dirname+'/app/img/icon-tray.png');
    tray.setContextMenu(Menu.buildFromTemplate(menu))


    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
});


app.on('window-all-closed', ()=>{
    app.quit();
});


let sobreWindow = null;
ipcMain.on('sobre', ()=>{
    if (sobreWindow ==null){
        sobreWindow = new BrowserWindow({
            width: 250,
            height: 250,
            alwaysOnTop: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        
        sobreWindow.on('closed', ()=>{
            sobreWindow = null;
        })

    }
    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`)
})


ipcMain.on('curso-parado', (e, curso, tempo)=>{
    console.log(curso, tempo);
    data.salvar(curso, tempo)
})