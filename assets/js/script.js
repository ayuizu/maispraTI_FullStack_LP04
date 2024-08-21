//Requisições assíncronas - MENU

function requisitar(url){

    document.getElementById('menu-items').innerHTML = ''

    let ajax = new XMLHttpRequest()
    
    ajax.open('GET', url)

    console.log(ajax.readyState)

    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById('menu-items').innerHTML = ajax.responseText
        }

        if(ajax.readyState == 4 && ajax.status == 404) {
            document.getElementById('menu-items').innerHTML = 'Requisição finalizada, porém o recurso não foi encontrado. Erro 404.'
        }
    }

    setTimeout(() => {
        ajax.send()
    }, 500)
}   
//Adicionando classe btn-active às abas ativas do menu
document.addEventListener('DOMContentLoaded', () => {

    let myBtns=document.querySelectorAll('.btn');
    myBtns.forEach(function(btn) {

        btn.addEventListener('click', () => {
          myBtns.forEach(b => b.classList.remove('btn-active'));
          btn.classList.add('btn-active');
        });
 
    });

});

//CRUD NO LOCAL STORAGE - RESERVAS
class Reservations{
    constructor(name,email,tel,year,month,day,hour,qtd){
        this.name=name;
        this.email=email;
        this.tel=tel;
        this.year=year;
        this.month=month;
        this.day=day;
        this.hour=hour;
        this.qtd=qtd;
    }
    validateData() {
        for (let key in this) {
            if (this[key] === undefined || this[key] === "") {
                console.error(`The field ${key} is required.`);
                return false;
            }
        }
        return true;
    }
}

class Database{
    constructor() {
        this.initDatabase();
    }
    initDatabase() {
        const id = localStorage.getItem('id');
        if (id === null) {
            localStorage.setItem('id', '0');
        }
    }
    loadReservations(){
        const reservations = [];
        const id = localStorage.getItem('id');

        for(let i=1;i<=id;i++){
            try{
                const reservation = JSON.parse(localStorage.getItem(i));
                if(reservation!=null){
                    reservation.id=i;
                    reservations.push(reservation);
                }
            }catch(e){
                console.error(`Error loading reservation with id ${i}: `, e);
            }
        }
        return reservations;
    }
    createReservation(reserv) {
        const id = this.getNextId(); // Obtem o próximo ID
        localStorage.setItem(id, JSON.stringify(reserv)); // Armazena a reserva no Local Storage
        localStorage.setItem('id', id.toString()); // Atualiza o ID no Local Storage, garantindo que a próxima reserva tenha um novo ID
    }
    getNextId() {
        const currentId = localStorage.getItem('id');
        return parseInt(currentId) + 1;
    }


    removeReservation(id) {
        localStorage.removeItem(id);
    }

    searchReservations(searchReservation) {
        const reservations = this.loadReservations();

        return reservations.filter(reservation => {
            return (searchReservation.name ? reservation.name === searchReservation.name : true) &&
                (searchReservation.tel ? reservation.tel === searchReservation.tel : true) &&
                (searchReservation.email ? reservation.email === searchReservation.email : true) &&
                (searchReservation.year ? reservation.year === searchReservation.year : true) &&
                (searchReservation.month ? reservation.month === searchReservation.month : true) &&
                (searchReservation.day ? reservation.day === searchReservation.day : true) &&
                (searchReservation.hour ? reservation.hour === searchReservation.hour : true) &&
                (searchReservation.qtd ? reservation.qtd === searchReservation.qtd : true);        
        });
    }

}

const database = new Database();

// Função para registrar uma nova tarefa
function registerReservation() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const tel = document.getElementById('tel').value;
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const hour = document.getElementById('hour').value;
    const qtd = document.getElementById('qtd-pessoas').value;

    const reserv = new Reservations(name,email,tel,year,month,day,hour,qtd);
 
    
    if (reserv.validateData()) {
        database.createReservation(reserv);
        alert('Reserva realizada com sucesso!');
        resetForm(); // Limpa o formulário após o registro
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('tel').value = '';
    document.getElementById('year').value = '';
    document.getElementById('month').value = '';
    document.getElementById('day').value = '';
    document.getElementById('hour').value = '';
    document.getElementById('qtd').value = '';
}
