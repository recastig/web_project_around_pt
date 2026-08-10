import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithConfirmation } from './PopupWithConfirmation.js';
import { UserInfo } from './UserInfo.js';
import { Api } from './Api.js';

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Item 11: instância única da API usada em todo o projeto.
// TODO: troque 'SEU_TOKEN_AQUI' pelo seu token pessoal.
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

// Item 9: botão novo (pencil) sobre o avatar.
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

// Item 6/7: guardam qual cartão está esperando confirmação de exclusão.
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

// Item 8: devolve a promise da API; quem trata o resultado é o próprio Card.
function handleLikeClick(cardId, isLiked) {
    return api.changeLikeCardStatus(cardId, isLiked);
}

// Item 6/7: abre o pop-up de confirmação e guarda o cartão em questão.
function handleDeleteClick(cardId, card) {
    selectedCardId = cardId;
    selectedCard = card;
    deleteConfirmationPopup.open();
}

// Item 2/7: precisa saber o id do usuário logado pra decidir se mostra a lixeira.
let currentUserId = null;

function createCard(data) {
    const card = new Card(data, cardTemplateSelector, currentUserId, {
        handleCardClick,
        handleLikeClick,
        handleDeleteClick
    });
    return card.generateCard();
}

// cardSection só existe depois que os dados do servidor chegarem (ver abaixo).
let cardSection;

// Item 1/2/11: busca perfil + cartões juntos; só renderiza depois que os
// dois chegarem.
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

// Item 9: pop-up de trocar avatar.
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