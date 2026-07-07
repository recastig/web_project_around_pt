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
const nameError = document.querySelector('#profile-name-error');
const descriptionError = document.querySelector('#profile-description-error');
const addButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('#new-card-popup');
const newCardCloseButton = newCardModal.querySelector('.popup__close');
const newCardForm = document.querySelector('#new-card-form');
const cardNameInput = document.querySelector('#card-name-input');
const cardLinkInput = document.querySelector('#card-link-input');
const cardNameError = document.querySelector('#card-name-error');
const cardLinkError = document.querySelector('#card-link-error');
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

function validateField(input, errorElement) {
    if (input.validity.valid) {
        input.classList.remove('popup__input_type_error');
        errorElement.classList.remove('popup__error_visible');
        errorElement.textContent = '';
        return true;
    } else {
        input.classList.add('popup__input_type_error');
        errorElement.textContent = input.validationMessage;
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

function validateProfileName() {
    if (nameInput.validity.valid) {
        nameInput.classList.remove('popup__input_type_error');
        nameError.classList.remove('popup__error_visible');
        nameError.textContent = '';
        return true;
    } else {
        nameInput.classList.add('popup__input_type_error');
        if (nameInput.validity.tooShort) {
            nameError.textContent = 'Aumente esse texto para 2 caracteres ou mais. No momento, você está usando ' + nameInput.value.length + ' caractere.';
        } else {
            nameError.textContent = nameInput.validationMessage;
        }
        nameError.classList.add('popup__error_visible');
        return false;
    }
}

function validateProfileDescription() {
    if (descriptionInput.validity.valid) {
        descriptionInput.classList.remove('popup__input_type_error');
        descriptionError.classList.remove('popup__error_visible');
        descriptionError.textContent = '';
        return true;
    } else {
        descriptionInput.classList.add('popup__input_type_error');
        // Mensagem personalizada para descrição curta
        if (descriptionInput.validity.tooShort) {
            descriptionError.textContent = 'Aumente esse texto para 2 caracteres ou mais. No momento, você está usando ' + descriptionInput.value.length + ' caractere.';
        } else {
            descriptionError.textContent = descriptionInput.validationMessage;
        }
        descriptionError.classList.add('popup__error_visible');
        return false;
    }
}

function validateEditProfileForm() {
    const isNameValid = validateProfileName();
    const isDescriptionValid = validateProfileDescription();
    const form = document.querySelector('#edit-profile-form');
    const button = form.querySelector('.popup__button');
    toggleButtonState(form, button);
    return isNameValid && isDescriptionValid;
}

function validateNewCardForm() {
    const isNameValid = validateField(cardNameInput, cardNameError);
    const isLinkValid = validateField(cardLinkInput, cardLinkError);

    const form = document.querySelector('#new-card-form');
    const button = form.querySelector('.popup__button');
    toggleButtonState(form, button);

    return isNameValid && isLinkValid;
}

function fillProfileForm() {
    const currentName = profileTitle.textContent;
    const currentDescription = profileDescription.textContent;
    nameInput.value = currentName;
    descriptionInput.value = currentDescription;
    nameInput.classList.remove('popup__input_type_error');
    descriptionInput.classList.remove('popup__input_type_error');
    nameError.classList.remove('popup__error_visible');
    descriptionError.classList.remove('popup__error_visible');
    nameError.textContent = '';
    descriptionError.textContent = '';
    const button = formElement.querySelector('.popup__button');
    button.classList.add('popup__button_inactive');
    button.disabled = true;
}

function handleOpenEditModal() {
    fillProfileForm();
    openModal(editModal);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    if (!formElement.checkValidity()) {
        validateEditProfileForm();
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

function resetNewCardForm() {
    cardNameInput.value = '';
    cardLinkInput.value = '';

    cardNameInput.classList.remove('popup__input_type_error');
    cardLinkInput.classList.remove('popup__input_type_error');
    cardNameError.classList.remove('popup__error_visible');
    cardLinkError.classList.remove('popup__error_visible');
    cardNameError.textContent = '';
    cardLinkError.textContent = '';

    const button = newCardForm.querySelector('.popup__button');
    button.classList.add('popup__button_inactive');
    button.disabled = true;
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    if (!newCardForm.checkValidity()) {
        validateNewCardForm();
        return;
    }

    const newCardName = cardNameInput.value;
    const newCardLink = cardLinkInput.value;
    renderCard(newCardName, newCardLink, cardsContainer);
    closeModal(newCardModal);
    resetNewCardForm();
}

formElement.addEventListener('submit', handleProfileFormSubmit);

nameInput.addEventListener('input', validateEditProfileForm);
descriptionInput.addEventListener('input', validateEditProfileForm);

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
        if (editModal.classList.contains('popup_is-opened')) {
            closeModal(editModal);
        }
        if (newCardModal.classList.contains('popup_is-opened')) {
            closeModal(newCardModal);
        }
        if (imageModal.classList.contains('popup_is-opened')) {
            closeModal(imageModal);
        }
    }
});

addButton.addEventListener('click', function() {
    resetNewCardForm();
    openModal(newCardModal);
});

newCardCloseButton.addEventListener('click', function() {
    closeModal(newCardModal);
});

cardNameInput.addEventListener('input', validateNewCardForm);
cardLinkInput.addEventListener('input', validateNewCardForm);
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

document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.querySelector('#edit-profile-form .popup__button');
    if (editButton) {
        editButton.classList.add('popup__button_inactive');
        editButton.disabled = true;
    }

    const newCardButton = document.querySelector('#new-card-form .popup__button');
    if (newCardButton) {
        newCardButton.classList.add('popup__button_inactive');
        newCardButton.disabled = true;
    }
});