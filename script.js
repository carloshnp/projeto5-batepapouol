let messages;
let user;

function userName() {
    user = {name: prompt('Qual é o seu nome?')};
    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    
    request.then(sucesso);
    request.catch(erro);
    
    function sucesso(resposta) {
        const status = resposta.status;
        console.log(status);
        setInterval(() => { statusUser();}, 5000);
        getMessages();
    }
    
    function erro(resposta) {
        const status = resposta.response.status;
        console.log(status);
        alert('Este nome já está em uso! Digite outro nome.');
        userName();
    }
}

userName();


function statusUser() {

    const userStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);

    userStatus.then(online);
    userStatus.catch(offline);
    
    function online(resposta) {
        const status = resposta.status;
        console.log(status);
    }

    function offline (resposta) {
        const status = resposta.response.status;
        console.log(status);
    }
}

function getMessages() {
    let dados = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    dados.then(data);

    function data(response) {
        const message = document.querySelector('.content');
        message.innerHTML = '';
        messages = response.data;
        messages.forEach(element => renderMessages(element));
        message.lastElementChild.scrollIntoView();
    }
}

setInterval(() => {getMessages();}, 3000);

function renderMessages(element) {
    const message = document.querySelector('.content');

    if (element.type == 'message') {
        message.innerHTML += `
        <div class='message'>
            <p> <span class='time'>(${element.time})</span> <span class='from'>${element.from}</span>para <span class='to'>${element.to}</span>: <span class='text'>${element.text}</span> </p>
        </div> `
    }

    if (element.type == 'status') {
        message.innerHTML += `
        <div class='message status'>
            <p> <span class='time'>(${element.time})</span> <span class='from'>${element.from}</span><span class='text'>${element.text}</span> </p>
        </div> `
    }

    if (element.type == 'private_message' && element.to == Object.values(user)[0]) {
        message.innerHTML += `
        <div class='message private_message'>
           <p> <span class='time'>(${element.time})</span> <span class='from'>${element.from}</span> reservadamente para <span class='to'>${element.to}</span>: <span class='text'>${element.text}</span> </p>
        </div> `
    }
}

function sendMessage() {
    const element = document.querySelector('.envio');
    let inputMsg = element.value;
    console.log(inputMsg);
    if (inputMsg !== '') {
        messageInput = {
            from: Object.values(user)[0],
	        to: "Todos",
            text: `${element.value}`,
            type: "message"
        }
    }
    console.log(inputMsg);
    console.log(messageInput);
    
    element.value = '';

    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', messageInput);
    
    request.then(envio);
    request.catch(erro);

    function envio(resposta) {
        getMessages();
        const status = resposta.status;
        console.log(status);
    }

    function erro(resposta) {
        const status = resposta.response.status;
        console.log(status);
        window.location.reload();
    }
}