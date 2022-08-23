const Joi = require("joi")

const ContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': `O nome deve ser um texto`,
        'string.empty': `O nome não pode ser vazio`,
        'string.min': `O nome deve ter pelo menos {#limit} caracteres`,
        'string.max': `O nome deve ter no máximo {#limit} caracteres`,
        'any.required': `O nome é um campo obrigatório`
      }),
    email: Joi.string().email().required().messages({
        'string.email': `O email não é válido`,
        'string.empty': `O email não pode ser vazio`,
        'any.required': `O email é um campo obrigatório`
      }),
    subject: Joi.string().min(3).max(30).required().messages({
        'string.base': `O assunto deve ser um texto`,
        'string.empty': `O assunto não pode ser vazio`,
        'string.min': `O assunto deve ter pelo menos {#limit} caracteres`,
        'string.max': `O assunto deve ter no máximo {#limit} caracteres`,
        'any.required': `O assunto é um campo obrigatório`
      }),
    message: Joi.string().min(3).max(3000).required().messages({
        'string.base': `A mensagem deve ser um texto`,
        'string.empty': `A mensagem não pode ser vazio`,
        'string.min': `A mensagem deve ter pelo menos {#limit} caracteres`,
        'string.max': `A mensagem deve ter no máximo {#limit} caracteres`,
        'any.required': `A mensagem é um campo obrigatório`
      })
})

module.exports = function(req, res, next) {
    const {error, value} = ContactSchema.validate(req.body);
    if (error) {
        return res.status(500).json({
            status:false,
            msg: error.details[0].message,
            field: error.details[0].context.key
        })
    }
    req.body = value
    return next()
}