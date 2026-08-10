export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // Item 11: centraliza a checagem de resposta do servidor. Se não for
    // ok, rejeita a promise para cair no catch() de quem chamou o método.
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Erro: ${res.status}`);
    }

    // Item 1: busca os dados do usuário logado (name, about, avatar, _id).
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then((res) => this._checkResponse(res));
    }

    // Item 2: busca a lista de cartões salvos no servidor.
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then((res) => this._checkResponse(res));
    }

    // Item 11 (recomendação final): dispara as duas requisições acima ao
    // mesmo tempo; os cartões só são renderizados depois que ambas voltarem.
    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    // Item 3: salva nome/descrição do perfil no servidor.
    updateUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about })
        }).then((res) => this._checkResponse(res));
    }

    // Item 4: cria um novo cartão no servidor.
    addCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, link })
        }).then((res) => this._checkResponse(res));
    }

    // Item 7: exclui um cartão do servidor pelo _id.
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => this._checkResponse(res));
    }

    // Item 8: PUT curte, DELETE descurte — mesma URL, método muda
    // conforme o estado atual (isLiked) que o Card informa.
    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        }).then((res) => this._checkResponse(res));
    }

    // Item 9: troca a foto de perfil.
    updateAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar: link })
        }).then((res) => this._checkResponse(res));
    }
}