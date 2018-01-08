var http = require('http');
var config = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

// 'Accept': 'text/html'

var client = http.request(config, function(result) {
    console.log(result.statusCode);

    result.on('data', function(body) {
        console.log('Retorno: ' + body);
    });
});

var novoLivro = 
{
    titulo: '50 anos de Som',
    descricao: 'Vamos trocar',
    preco: 15000
}

client.end(JSON.stringify(novoLivro));