import { openModal } from './utils.js';

export class Card {
    constructor({ name, link }, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content.querySelector('.card')
            .cloneNode(true);
    }

    _handleLikeButton() {
        this._likeButton.classList.toggle('card__like-button_is-active');
    }

    _handleDeleteButton() {
        this._element.remove();
    }

    _handleImageClick() {
        const popup = document.querySelector('#image-popup');
        const popupImage = popup.querySelector('.popup__image');
        const popupCaption = popup.querySelector('.popup__caption');

        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;

        openModal(popup);
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._handleLikeButton());
        this._deleteButton.addEventListener('click', () => this._handleDeleteButton());
        this._cardImage.addEventListener('click', () => this._handleImageClick());
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like-button');
        this._deleteButton = this._element.querySelector('.card__delete-button');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}