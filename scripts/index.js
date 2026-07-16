import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const initialCards = [
    {
        name: "Vale de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {
        name: "Montanhas Carecas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
    {
        name: "Parque Nacional Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];

const cardTemplateSelector = '#card-template';

const editButton = document.querySelector('.profile__edit-button');
const editFormElement = document.querySelector('#edit-profile-form');

const addButton = document.querySelector('.profile__add-button');
const newCardForm = document.querySelector('#new-card-form');

const editFormValidator = new FormValidator(validationConfig, editFormElement);
editFormValidator.setEventListeners();

const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    jobSelector: '.profile__description'
});

const popupWithImage = new PopupWithImage('#image-popup');
popupWithImage.setEventListeners();

function handleCardClick(link, name) {
    popupWithImage.open(link, name);
}

function createCard(data) {
    const card = new Card(data, cardTemplateSelector, handleCardClick);
    return card.generateCard();
}

const cardSection = new Section({
    items: initialCards,
    renderer: (data) => {
        cardSection.addItem(createCard(data));
    }
}, '.cards__list');

cardSection.renderItems();

const editProfilePopup = new PopupWithForm('#edit-popup', (data) => {
    userInfo.setUserInfo({ name: data.name, job: data.description });
    editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm('#new-card-popup', (data) => {
    const card = createCard({ name: data['place-name'], link: data.link });
    cardSection.addItem(card);
    newCardPopup.close();
});
newCardPopup.setEventListeners();

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