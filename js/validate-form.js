const orderForm = document.getElementById('zakup-wycieczki');
orderForm.addEventListener('submit', validateForm);

const nameInput = document.getElementsByName('imie')[0];
const surnameInput = document.getElementsByName('nazwisko')[0];

function startFocus() {
    this.style.backgroundColor = 'lightgrey';
}

function endFocus() {
    this.style.backgroundColor = 'white';
}

nameInput.addEventListener('focus', startFocus);
surnameInput.addEventListener('focus', startFocus);
nameInput.addEventListener('blur', endFocus);
surnameInput.addEventListener('blur', endFocus);

const okModal = document.getElementById('okModal');
const closeSpan = document.getElementsByClassName('close')[0];

function closeOkModal() {
    okModal.style.display = 'none';
}

closeSpan.onclick = closeOkModal;

function validateForm(event) {
    const name = document.forms['zakup-wycieczki']['imie'].value;
    const surname = document.forms['zakup-wycieczki']['nazwisko'].value;
    const count = document.forms['zakup-wycieczki']['ile-wycieczek'].value;

    let correct = true;

    nameInput.classList.remove('dane-klienta-zle');
    surnameInput.classList.remove('dane-klienta-zle');
    document.getElementsByClassName('form-komunikat')[0].style.display = 'none';
    document.getElementsByClassName('form-komunikat')[1].style.display = 'none';
    document.getElementsByClassName('form-komunikat')[2].style.display = 'none';
    document.getElementsByClassName('form-komunikat')[3].style.display = 'none';

    if (name === '') {
        nameInput.className = 'dane-klienta-zle';
        document.getElementsByClassName('form-komunikat')[0].style.display = 'inline-block';
        correct = false;
    }
    else if (name.length > 40) {
        nameInput.className = 'dane-klienta-zle';
        document.getElementsByClassName('form-komunikat')[1].style.display = 'inline-block';
        correct = false;
    }

    if (surname === '') {
        surnameInput.className = 'dane-klienta-zle';
        document.getElementsByClassName('form-komunikat')[2].style.display = 'inline-block';
        correct = false;
    }
    else if (surname.length > 40) {
        surnameInput.className = 'dane-klienta-zle';
        document.getElementsByClassName('form-komunikat')[3].style.display = 'inline-block';
        correct = false;
    }

    /*if (journey === '') {
        alert("Wybierz opcję wycieczki.");
        correct = false;
    }

    if (count < 1 || count > 10) {
        alert("Podaj ilość wycieczek (od 1 do 10).");
        correct = false;
    }*/

    event.preventDefault();
    if (correct) {
        okModal.style.display = 'block';
        const modalInfo = `imię - ${name}, nazwisko - ${surname}, ilość - ${count}`;
        document.getElementsByClassName('modal-text')[0].innerHTML = modalInfo;
        const closeOkModalTimeout = setTimeout(closeOkModal, 5000);
    }
}
