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

const editButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('#edit-popup');
const closeButton = editModal.querySelector('.popup__close');
const formElement = document.querySelector('#edit-profile-form');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

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

formElement.addEventListener('submit', handleProfileFormSubmit);

editButton.addEventListener('click', function() {
    handleOpenEditModal();
});

closeButton.addEventListener('click', function() {
    closeModal(editModal);
});