var express = require('express');
var load = require('express-load'); // load das dependencias rotas ...
var bodyParser = require('body-parser'); // Realiza a conversão do corpo do formulário para o json no post request.body
var expressValidator = require('express-validator'); // Validação de campos obrigatoriedade

module.exports = function() {
    var app = express();
    
    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs'); // configuração inicial do ejs
    app.set('views', './app/views'); // pasta das views

    app.use(bodyParser.urlencoded({extended: true})); // Middlesware
    app.use(bodyParser.json()); // Middlesware
    app.use(expressValidator()); // Middlesware

    // Carrega todas os arquivos de rotas e infra das pastas informadas
    load('routes', {cwd: 'app'}) //cwd força que deve procurar dentro da pasta app
        .then('infra')
        .into(app);

    // Middlesware
    app.use(function(req, res, next) {
        res.status(404).render('erros/404');
    });

    // Middlesware
    app.use(function(error, req, res, next) {
        if(!process.env.NODE_ENV) {
            res.status(500).render('erros/500', {error: error});
        } else {
            if(!process.env.NODE_ENV) {
                res.status(500).render('erros/500', {error: ''});
            }
        }
    });

    return app;
}