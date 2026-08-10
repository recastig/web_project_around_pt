import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const api = new Api({
    baseUrl: 'https://around-api.pt-br.tripleten-services.com/v1',
    headers: {
        authorization: '1636f1dd-efbd-41c4-bf3a-0a6007b2e4dd',
        'Content-Type': 'application/json'
    }
});

const cardTemplateSelector = '#card-template';

const editButton = document.querySelector('.profile__edit-button');
const editFormElement = document.querySelector('#edit-profile-form');

const addButton = document.querySelector('.profile__add-button');
const newCardForm = document.querySelector('#new-card-form');

const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarFormElement = document.querySelector('#edit-avatar-form');

const editFormValidator = new FormValidator(validationConfig, editFormElement);
editFormValidator.setEventListeners();

const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.setEventListeners();

const avatarFormValidator = new FormValidator(validationConfig, avatarFormElement);
avatarFormValidator.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__description',
    avatarSelector: '.profile__image'
});

const popupWithImage = new PopupWithImage('#image-popup');
popupWithImage.setEventListeners();

let selectedCardId = null;
let selectedCard = null;

const deleteConfirmationPopup = new PopupWithConfirmation('#delete-popup', () => {
    api.deleteCard(selectedCardId)
        .then(() => {
            selectedCard.removeCard();
            deleteConfirmationPopup.close();
        })
        .catch((err) => console.log(err));
});
deleteConfirmationPopup.setEventListeners();

function handleCardClick(link, name) {
    popupWithImage.open(link, name);
}

function handleLikeClick(cardId, isLiked) {
    return api.changeLikeCardStatus(cardId, isLiked);
}

function handleDeleteClick(cardId, card) {
    selectedCardId = cardId;
    selectedCard = card;
    deleteConfirmationPopup.open();
}

let currentUserId = null;

function createCard(data) {
    const card = new Card(data, cardTemplateSelector, currentUserId, {
        handleCardClick,
        handleLikeClick,
        handleDeleteClick
    });
    return card.generateCard();
}

let cardSection;

api.getAppInfo()
    .then(([userData, cards]) => {
        currentUserId = userData._id;
        userInfo.setUserInfo({ name: userData.name, job: userData.about, avatar: userData.avatar });

        cardSection = new Section({
            items: cards,
            renderer: (data) => {
                cardSection.addItem(createCard(data));
            }
        }, '.cards__list');

        cardSection.renderItems();
    })
    .catch((err) => console.log(err));

const editProfilePopup = new PopupWithForm('#edit-popup', (data) => {
    editProfilePopup.renderLoading(true);
    api.updateUserInfo({ name: data.name, about: data.description })
        .then((userData) => {
            userInfo.setUserInfo({ name: userData.name, job: userData.about, avatar: userData.avatar });
            editProfilePopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => editProfilePopup.renderLoading(false));
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm('#new-card-popup', (data) => {
    newCardPopup.renderLoading(true);
    api.addCard({ name: data['place-name'], link: data.link })
        .then((cardData) => {
            cardSection.addItem(createCard(cardData));
            newCardPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => newCardPopup.renderLoading(false));
});
newCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm('#edit-avatar-popup', (data) => {
    avatarPopup.renderLoading(true);
    api.updateAvatar(data.avatar)
        .then((userData) => {
            userInfo.setUserInfo({ name: userData.name, job: userData.about, avatar: userData.avatar });
            avatarPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

editButton.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    editProfilePopup.setInputValues({ name: data.name, description: data.job });
    editFormValidator.resetValidation();
    editProfilePopup.open();
});

addButton.addEventListener('click', () => {
    newCardFormValidator.resetValidation();
    newCardPopup.open();
});

avatarEditButton.addEventListener('click', () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
});