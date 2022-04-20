export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  _showInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid){
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled',);
    }
  }

  _getInputList(formElement) {
    return Array.from(formElement.querySelectorAll(this._settings.inputSelector));
  }

  _getButtonElement(formElement) {
    return formElement.querySelector(this._settings.submitButtonSelector);
  }

  _setEventListener(formElement) {
    const inputList = this._getInputList(formElement);
    const buttonElement = this._getButtonElement(formElement);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    });
  }

  enableValidation() {
    this._setEventListener(this._formElement);
  }

  clearErrors(formElement) {
   const inputList = this._getInputList(formElement);
   inputList.forEach((inputElement) => {
     this._hideInputError(inputElement);
    });
  }

  disableButton(formElement) {
    const buttonElement = this._getButtonElement(formElement);
    buttonElement.setAttribute('disabled', 'disabled');
    buttonElement.classList.add(this._settings.inactiveButtonClass);
  }
}
