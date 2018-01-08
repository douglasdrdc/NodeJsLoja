
var express = require('../config/express')();
var request = require('supertest')(express);

describe('produtosController', function() {

    // Existe uma biblioteca que limpa todas as tabelas antes de usar automaticamente
    // node-database-cleaner    
    var limpaTabelas = function(done) {
        var connection = express.infra.connectionFactory();
        connection.query("delete from produto", function(ex, result){
            if (!ex) {
                done();
            }
        });
    }
    beforeEach(function(done) {
        limpaTabelas(done);
    });
    afterEach(function(done) {
        limpaTabelas(done);
    });

    it('#lista produtos formato json', function(done) {  
        request.get('/produtos')
            .set('Accept','application/json') // seta tipo de retorno no cabeçalho            
            .expect(200) // validação do retorno e informa que finalizou o teste
            .expect('Content-type', /json/, done);   // validação do retorno
    });

    it('#cadastro de novo produto com titulo inválido', function(done) {  
        request.post('/produtos')
            .send({titulo: "", descricao: "novo"})
            .expect(400,done);
    });

    it('#cadastro de novo produto com preço inválido', function(done) {  
        request.post('/produtos')
            .send({titulo: "Teste", descricao: "Teste", preco: "teste"})
            .expect(400,done);
    });

    it('#cadastro de novo produto com sucesso', function(done) {  
        request.post('/produtos')
            .set('Accept','application/json')            
            .send({titulo: "Teste Livro", descricao: "Descrição de teste", preco: 20})
            .expect(200,done);            
    });

});
