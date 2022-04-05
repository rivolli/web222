var express = require('express');
var router = express.Router();
const equipes = require('../helpers/equipes')
const Email = require('../helpers/email')
const contactValidator = require('../validators/contactValidator')

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


router.post("/api/sendmessage", contactValidator, async function(req, res){
  let {name, email, subject, message} = req.body
  let content = `
    <p><b>${name}</b> - <a href="mailto:${email}">${email}</a> enviou uma mensagem</p>

    <p><b>Assunto da mensagem:</b> ${subject}</p>

    <p><b>Conteúdo da mensagem:</b></p>
    ${message}`

  let resp = await Email.send({name:name, email:email},
                              {name:'Adriano', email:'rivolli@utfpr.edu.br'},
                              `Mensagem do site: ${name}`, content)
  res.json({status: resp})
  //res.json({status: true})
})

module.exports = router;
