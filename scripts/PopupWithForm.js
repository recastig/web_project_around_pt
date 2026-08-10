import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        // Item 10: guarda o texto original do botão para poder voltar a ele depois.
        this._submitButton = this._form.querySelector('.popup__button');
        this._buttonText = this._submitButton.textContent;
    }

    _getInputValues() {
        const values = {};
        this._inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name] || '';
        });
    }

    // Item 10: alterna o texto do botão enquanto a requisição está em andamento.
    // Quem decide quando chamar isso é o index.js, que sabe quando a
    // promise da API começa e termina.
    renderLoading(isLoading) {
        this._submitButton.textContent = isLoading ? 'Salvando...' : this._buttonText;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}