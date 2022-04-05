function enviarForm() {
    let msgField = document.querySelector("#vmessage")

    let form = new FormData(document.getElementById('contact-form'))
    var formData = {};
    form.forEach((value, key) => formData[key] = value);

    msgField.innerHTML = ''
    axios.post("/api/sendmessage", formData).then(respose => {
        let fields = ['name', 'email', 'subject', 'message']
        fields.forEach(key => {
            document.querySelector("#"+key).value = '';
        })
        msgField.innerHTML = `<span class="alert alert-success">Mensagem enviada com sucesso!</span>`
    }).catch(err => {
        if (err.response) {
            let {msg, field} = err.response.data
            msgField.innerHTML = `<span class="alert alert-danger">${msg}</span>`
            let input = document.querySelector('#'+field)
            input.focus();
            input.classList.add('is-invalid')
        } else {
            msgField.innerHTML = '<span class="alert alert-danger">Falha ao enviar a mensagem, tente novamente mais tarde!</śpan>'
        }
    })

    return false;
}

function validaForm() {
    
}

window.addEventListener("load", function() {
    let fields = ['name', 'email', 'subject', 'message']
    fields.forEach(key => {
        let input = document.querySelector("#"+key)
        input.addEventListener("change", () => {
            input.classList.remove('is-invalid')
            document.querySelector("#vmessage").innerHTML = ''
        })
    })
})