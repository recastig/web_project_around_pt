import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._handleConfirm = handleConfirm;
        this._confirmButton = this._popup.querySelector('.popup__button');
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', () => {
            this._handleConfirm();
        });
    }
}