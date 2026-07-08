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

const cardTemplate = document.querySelector('#card-template');
const cardsContainer = document.querySelector('.cards__list');
const editButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('#edit-popup');
const closeButton = editModal.querySelector('.popup__close');
const formElement = document.querySelector('#edit-profile-form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('#profile-name-input');
const descriptionInput = document.querySelector('#profile-description-input');
const addButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('#new-card-popup');
const newCardCloseButton = newCardModal.querySelector('.popup__close');
const newCardForm = document.querySelector('#new-card-form');
const cardNameInput = document.querySelector('#card-name-input');
const cardLinkInput = document.querySelector('#card-link-input');
const imageModal = document.querySelector('#image-popup');
const imageModalCloseButton = imageModal.querySelector('.popup__close');
const popupImage = imageModal.querySelector('.popup__image');
const popupCaption = imageModal.querySelector('.popup__caption');

function openModal(modal) {
    modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
}

function getErrorElement(input) {
    const form = input.closest('form');
    return form.querySelector(`#${input.id.replace('-input', '-error')}`);
}

function validateField(input, errorElement) {
    if (input.validity.valid) {
        input.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__error_visible');
        errorElement.textContent = '';
        return true;
    } else {
        input.classList.add('popup__input_type_error');
        if (input.validity.tooShort) {
            errorElement.textContent =
                `Aumente esse texto para ${input.minLength} caracteres ou mais. ` +
                `No momento, você está usando ${input.value.length} caractere(s).`;
        } else {
            errorElement.textContent = input.validationMessage;
        }
        errorElement.classList.add('popup__error_visible');
        return false;
    }
}

function toggleButtonState(form, button) {
    const isValid = form.checkValidity();

    if (isValid) {
        button.classList.remove('popup__button_inactive');
        button.disabled = false;
    } else {
        button.classList.add('popup__button_inactive');
        button.disabled = true;
    }
}

function validateForm(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    let isFormValid = true;

    inputList.forEach((input) => {
        const errorElement = getErrorElement(input);
        const isFieldValid = validateField(input, errorElement);
        if (!isFieldValid) {
            isFormValid = false;
        }
    });

    toggleButtonState(form, form.querySelector('.popup__button'));
    return isFormValid;
}

function resetFormValidation(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));

    inputList.forEach((input) => {
        input.classList.remove('popup__input_type_error');
        const errorElement = getErrorElement(input);
        errorElement.classList.remove('popup__error_visible');
        errorElement.textContent = '';
    });

    toggleButtonState(form, form.querySelector('.popup__button'));
}

function setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const button = form.querySelector('.popup__button');

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            const errorElement = getErrorElement(input);
            validateField(input, errorElement);
            toggleButtonState(form, button);
        });
    });
}

function enableValidation() {
    const forms = Array.from(document.querySelectorAll('.popup__form'));
    forms.forEach((form) => {
        setEventListeners(form);
        resetFormValidation(form);
    });
}

function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
    fillProfileForm();
    resetFormValidation(formElement);
    openModal(editModal);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    if (!validateForm(formElement)) {
        return;
    }
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;
    profileTitle.textContent = newName;
    profileDescription.textContent = newDescription;
    closeModal(editModal);
}

function getCardElement(name, link) {
    const cardElement = cardTemplate.content.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardItem = cardElement.querySelector('.card');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    deleteButton.addEventListener('click', function() {
        cardItem.remove();
    });

    cardImage.addEventListener('click', function() {
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;
        openModal(imageModal);
    });

    return cardElement;
}

function renderCard(name, link, container) {
    const cardElement = getCardElement(name, link);
    container.prepend(cardElement);
}

initialCards.forEach(function(card) {
    renderCard(card.name, card.link, cardsContainer);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    if (!validateForm(newCardForm)) {
        return;
    }

    const newCardName = cardNameInput.value;
    const newCardLink = cardLinkInput.value;
    renderCard(newCardName, newCardLink, cardsContainer);
    closeModal(newCardModal);
    newCardForm.reset();
    resetFormValidation(newCardForm);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

editButton.addEventListener('click', function() {
    handleOpenEditModal();
});

closeButton.addEventListener('click', function() {
    closeModal(editModal);
});

editModal.addEventListener('click', function(event) {
    if (event.target === editModal) {
        closeModal(editModal);
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        if (openedModal) {
            closeModal(openedModal);
        }
    }
});

addButton.addEventListener('click', function() {
    newCardForm.reset();
    resetFormValidation(newCardForm);
    openModal(newCardModal);
});

newCardCloseButton.addEventListener('click', function() {
    closeModal(newCardModal);
});

newCardForm.addEventListener('submit', handleCardFormSubmit);
newCardModal.addEventListener('click', function(event) {
    if (event.target === newCardModal) {
        closeModal(newCardModal);
    }
});

imageModalCloseButton.addEventListener('click', function() {
    closeModal(imageModal);
});

imageModal.addEventListener('click', function(event) {
    if (event.target === imageModal) {
        closeModal(imageModal);
    }
});

document.addEventListener('DOMContentLoaded', enableValidation);