export class Card {
    constructor(data, templateSelector, userId, { handleCardClick, handleLikeClick, handleDeleteClick }) {
        this._name = data.name;
        this._link = data.link;
        // Item 2/7/8: dados que só existem porque o cartão agora vem do servidor.
        this._cardId = data._id;
        this._ownerId = data.owner;
        this._isLiked = data.isLiked;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content.querySelector('.card')
            .cloneNode(true);
    }

    // Item 8: não alterna a classe direto — pede pro index.js chamar a API
    // e só atualiza o ícone quando a resposta do servidor confirmar.
    _handleLikeButton() {
        this._handleLikeClick(this._cardId, this._isLiked)
            .then((updatedCard) => {
                this._isLiked = updatedCard.isLiked;
                this._likeButton.classList.toggle('card__like-button_is-active', this._isLiked);
            })
            .catch((err) => console.log(err));
    }

    // Item 6/7: não remove mais o cartão direto — abre o pop-up de confirmação.
    _handleDeleteButton() {
        this._handleDeleteClick(this._cardId, this);
    }

    _handleImageClick() {
        this._handleCardClick(this._link, this._name);
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._handleLikeButton());
        this._deleteButton.addEventListener('click', () => this._handleDeleteButton());
        this._cardImage.addEventListener('click', () => this._handleImageClick());
    }

    // Item 7: método público para o index.js remover o cartão da tela
    // depois que o servidor confirmar a exclusão.
    removeCard() {
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like-button');
        this._deleteButton = this._element.querySelector('.card__delete-button');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        // Item 5: mostra o coração já preenchido se o cartão já estava curtido.
        if (this._isLiked) {
            this._likeButton.classList.add('card__like-button_is-active');
        }

        // Item 7: esconde a lixeira se o cartão não pertence ao usuário logado.
        if (this._ownerId !== this._userId) {
            this._deleteButton.classList.add('card__delete-button_hidden');
        }

        this._setEventListeners();

        return this._element;
    }
}