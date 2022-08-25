const user = {name: prompt('Qual é o seu nome?')};
const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);

request.then(sucesso);
request.catch(erro);

function sucesso(resposta) {
    const status = resposta.status;
    console.log(status);
    statusUser();
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