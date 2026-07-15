export function openModal(modal) {
    modal.classList.add('popup_is-opened');
}

export function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
}

export function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedModal = document.querySelector('.popup_is-opened');
        if (openedModal) {
            closeModal(openedModal);
        }
    }
}

export function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}

export function handleCloseButtonClick(evt) {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
}