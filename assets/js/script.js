function confirmarReserva() {

    alert("Reserva confirmada. Verifique seu e-mail.");

    // let email = getElementById('email').value;
    // let tel = getElementById('tel').value;
    // let year = getElementById('year').value;
    // let month = getElementById('month').value;
    // let day = getElementById('day').value;
    // if(nome!=null && email!=null && tel!=null && year!=null && month!=null && day!=null)
    //    alert("Reserva confirmada. Verifique seu e-mail.");
    // else
    //     alert("Não foi possível confirmar sua reserva. Por favor, tente novamente.");
}

function requisitar(url){
    document.getElementById('content').innerHTML = ''

    let ajax = new XMLHttpRequest()
    
    ajax.open('GET', url)

    console.log(ajax.readyState)

    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById('content').innerHTML = ajax.responseText
        }

        if(ajax.readyState == 4 && ajax.status == 404) {
            document.getElementById('content').innerHTML = 'Requisição finalizada, porém o recurso não foi encontrado. Erro 404.'
        }
    }

    setTimeout(() => {
        ajax.send()
    }, 500)
}   