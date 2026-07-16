import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openModal, closeModal, handleEscClose, handleOverlayClick, handleCloseButtonClick } from './utils.js';

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
const cardsContainer = document.querySelector('.cards__list');

const editButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('#edit-popup');
const editFormElement = document.querySelector('#edit-profile-form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#profile-name-input');
const descriptionInput = document.querySelector('#profile-description-input');

const addButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('#new-card-popup');
const newCardForm = document.querySelector('#new-card-form');
const cardNameInput = document.querySelector('#card-name-input');
const cardLinkInput = document.querySelector('#card-link-input');

// 1D. Uma instância de FormValidator para cada formulário que precisa de validação.
const editFormValidator = new FormValidator(validationConfig, editFormElement);
editFormValidator.setEventListeners();

const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.setEventListeners();

// 1B. Uma instância de Card para cada cartão.
function createCard(data) {
    const card = new Card(data, cardTemplateSelector);
    return card.generateCard();
}

initialCards.forEach((data) => {
    cardsContainer.prepend(createCard(data));
});

function handleOpenEditModal() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    editFormValidator.resetValidation();
    openModal(editModal);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editModal);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newCardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };
    cardsContainer.prepend(createCard(newCardData));
    closeModal(newCardModal);
}

editButton.addEventListener('click', handleOpenEditModal);
editFormElement.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => {
    newCardForm.reset();
    newCardFormValidator.resetValidation();
    openModal(newCardModal);
});
newCardForm.addEventListener('submit', handleCardFormSubmit);

// Manipuladores genéricos (importados de utils.js), ligados a todos os pop-ups de uma vez.
document.querySelectorAll('.popup__close').forEach((closeButton) => {
    closeButton.addEventListener('click', handleCloseButtonClick);
});

document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('click', handleOverlayClick);
});

document.addEventListener('keydown', handleEscClose);