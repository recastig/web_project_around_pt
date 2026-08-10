import { Popup } from './Popup.js';

// Item 6: pop-up de confirmação de exclusão, filho de Popup — reaproveita
// fechar por Esc, por clique fora e no "X", só acrescenta o botão "Sim".
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