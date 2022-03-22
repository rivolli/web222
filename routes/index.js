var express = require('express');
var router = express.Router();
const equipes = require('../helpers/equipes')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Início', index:true });
});

router.get('/sobre', function(req, res, next) {
  res.render('sobre', { title: 'Sobre o projeto', sobre:true });
});

router.get('/equipe', async function(req, res, next) {
  res.render('equipe', { title: 'Equipe de desenvolvimento',
                         equipe:true,
                         equipes: await equipes()
                        });
});

router.get('/contato', function(req, res, next) {
  res.render('contato', { title: 'Fale conosco', contato:true });
});

module.exports = router;
