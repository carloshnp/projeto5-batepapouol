let messages;

const user = {name: prompt('Qual é o seu nome?')};
const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);

request.then(sucesso);
request.catch(erro);

function sucesso(resposta) {
    const status = resposta.status;
    console.log(status);
    statusUser();
    getMessages();
}

function erro(resposta) {
    const status = resposta.response.status;
    console.log(status);
}

function statusUser() {

    const userStatus = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);

    setInterval(() => {
        userStatus.then(online);
        userStatus.catch(offline);
    }, 5000);

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
        console.log(messages);
    }
}

function renderMessages(element) {
    const message = document.querySelector('.content');

    if (element.type == 'message') {
        message.innerHTML += `
        <div class='message'>
            <span>${element.time}</span>
            <span>${element.from}</span>
            <span>${element.to}</span>
            <span>${element.text}</span>
        </div> `
    }

    if (element.type == 'status') {
        message.innerHTML += `
        <div class='message'>
            <span>${element.time}</span>
            <span>${element.from}</span>
            <span>${element.to}</span>
            <span>${element.text}</span>
        </div> `
    }

    if (element.type == 'private_message') {
        message.innerHTML += `
        <div class='message'>
            <span>${element.time}</span>
            <span>${element.from}</span>
            <span>${element.to}</span>
            <span>${element.text}</span>
        </div> `
    }
}