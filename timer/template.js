const data = require('./data');

module.exports = {
    carregar(mainWindow){
        let lista=data.carregar();

        mainWindow.send('selecionado', lista[0]);

        let template =[
            {label: 'Selecione'},
            {type: 'separator'}
        ]

        lista.forEach((arquivo)=>{
            let item = { label: arquivo, type: 'radio', click: function(){
                mainWindow.send('selecionado', arquivo)
            } }


            template.push(item)
        })
        

        

        return template;
    }
}