import { Popup } from './Popup.js';

// 🔹 CLASSE: Define um molde para criar objetos
export class PopupWithForm extends Popup {  // ← CLASSE
    constructor(popupSelector, handleFormSubmit, formValidator) {
        // 🔹 SUPER: Chama o construtor da classe mãe (Popup)
        super(popupSelector);  // ← SUPER

        // 🔹 ENCAPSULAMENTO: _ (underline) indica que é "privado"
        this._handleFormSubmit = handleFormSubmit;  // ← ENCAPSULAMENTO
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._form.querySelector('.popup__button');
        this._buttonText = this._submitButton.textContent;
        this._formValidator = formValidator;
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

    renderLoading(isLoading) {
        this._submitButton.textContent = isLoading ? 'Salvando...' : this._buttonText;
    }

    // 🔹 SOBRESCRITA: Substitui o método da classe mãe
    setEventListeners() {
        // 🔹 SUPER: Chama o método da classe mãe
        super.setEventListeners();  // ← SUPER

        // 🔹 CALLBACK: Função passada como argumento (handleFormSubmit)
        // 🔹 FUNÇÃO DE ORDEM SUPERIOR: addEventListener recebe uma função como argumento
        this._form.addEventListener('submit', (evt) => {  // ← CALLBACK + FUNÇÃO DE ORDEM SUPERIOR
            evt.preventDefault();
            // O callback é executado quando o evento acontece
            this._handleFormSubmit(this._getInputValues());  // ← CALLBACK
        });
    }

    // 🔹 SOBRESCRITA: Substitui o método close da classe mãe
    close() {
        // 🔹 SUPER: Chama o método da classe mãe
        super.close();  // ← SUPER
        this._form.reset();
        if (this._formValidator) {
            this._formValidator.resetValidation();
        }
    }
}