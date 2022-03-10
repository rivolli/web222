var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Início', index:true });
});

router.get('/sobre', function(req, res, next) {
  res.render('sobre', { title: 'Sobre o projeto', sobre:true });
});

router.get('/equipe', function(req, res, next) {
  res.render('equipe', { title: 'Equipe de desenvolvimento', equipe:true });
});

router.get('/contato', function(req, res, next) {
  res.render('contato', { title: 'Fale conosco', contato:true });
});

module.exports = router;
