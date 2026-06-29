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
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const addButton = document.querySelector('.profile__add-button');
const newCardModal = document.querySelector('#new-card-popup');
const newCardCloseButton = newCardModal.querySelector('.popup__close');
const newCardForm = document.querySelector('#new-card-form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_url');
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

function fillProfileForm() {
    const currentName = profileTitle.textContent;
    const currentDescription = profileDescription.textContent;

    nameInput.value = currentName;
    descriptionInput.value = currentDescription;
}

function handleOpenEditModal() {
    fillProfileForm();
    openModal(editModal);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newDescription = descriptionInput.value;
    profileTitle.textContent = newName;
    profileDescription.textContent = newDescription;
    closeModal(editModal);
}

function getCardElement(name = "Lugar sem nome", link = "./images/placeholder.jpg") {
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
    const newCardName = cardNameInput.value;
    const newCardLink = cardLinkInput.value;
    renderCard(newCardName, newCardLink, cardsContainer);
    closeModal(newCardModal);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

editButton.addEventListener('click', function() {
    handleOpenEditModal();
});

closeButton.addEventListener('click', function() {
    closeModal(editModal);
});

addButton.addEventListener('click', function() {
    openModal(newCardModal);
});

newCardCloseButton.addEventListener('click', function() {
    closeModal(newCardModal);
});

newCardForm.addEventListener('submit', handleCardFormSubmit);

imageModalCloseButton.addEventListener('click', function() {
    closeModal(imageModal);
});