var http = require('http');
var config = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'get',
    headers: {
        'Accept': 'application/json'
    }
};

// 'Accept': 'text/html'

http.get(config, function(result) {
    console.log(result.statusCode);

    result.on('data', function(body) {
        console.log('Retorno: ' + body);
    });
});