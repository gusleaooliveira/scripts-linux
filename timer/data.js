const jsonfile = require('jsonfile-promised')
const fs = require('fs')
module.exports = {
    carregar(){
        let lista = fs.readdirSync(__dirname+'/data/');
        return lista.map((arquivo)=>{
            return arquivo.substr(0, arquivo.lastIndexOf('.'));
        })
    },
    ler(conteudo){
        let caminho = __dirname+'/data/'+conteudo+'.json';
        return jsonfile.readFile(caminho);
    },
    salvar(conteudo, tempo){
        let caminho = __dirname+'/data/'+conteudo+'.json';
        if(fs.existsSync(caminho)){
            this.adiciona(caminho, tempo, conteudo)
        }
        else{
            this.criarArquivo(caminho, {})
                .then(()=>{
                    this.adiciona(caminho, tempo, conteudo)
                })
        }
    },
    adiciona(arquivo, tempo, conteudo){
        let objeto = {
            ultimo: new Date().toString(),
            tempo: tempo,
            anotacao: conteudo
        }
        jsonfile.writeFile(arquivo, objeto, {spaces: 2})
            .then(()=>{console.log('Adicionar!');})
            .catch((erro)=>{console.log(`Èrro:${erro}`);})
    },
    criarArquivo(nome, conteudo){
        return jsonfile.writeFile(nome, conteudo)
            .then(()=>{
                console.log('Salvou!');
            })
            .catch((erro)=>{
                console.log(`Errou:${erro}`);
            });
    
    }
}