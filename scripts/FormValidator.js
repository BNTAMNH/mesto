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

// const settings = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-btn',
//   inactiveButtonClass: 'popup__save-btn_type_disabled',
//   inputErrorClass: 'popup__input_type_invalid',
//   errorClass: 'popup__input-error_active'
// };

// function showInputError(formElement, inputElement, errorMessage, settings) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(settings.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(settings.errorClass);
// }

// function hideInputError(formElement, inputElement, settings) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(settings.inputErrorClass);
//   errorElement.textContent = '';
//   errorElement.classList.remove(settings.errorClass);
// }

// function clearError(element) {
//   const formElement = element.querySelector('.popup__form');
//   const inputList = Array.from(element.querySelectorAll('.popup__input'));
//   inputList.forEach((inputElement) => {
//     hideInputError(formElement, inputElement, settings);
//   })
// }

// function checkInputValidity(formElement, inputElement, settings) {
//   if (!inputElement.validity.valid){
//     showInputError(formElement, inputElement, inputElement.validationMessage, settings);
//   } else {
//     hideInputError(formElement, inputElement, settings);
//   }
// }

// function hasInvalidInput(inputList){
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

// function toggleButtonState(inputList, buttonElement, settings) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(settings.inactiveButtonClass);
//     buttonElement.setAttribute('disabled', 'disabled');
//   } else {
//     buttonElement.classList.remove(settings.inactiveButtonClass);
//     buttonElement.removeAttribute('disabled',);
//   }
// }

// function setEventListener(formElement, settings) {
//   const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
//   const buttonElement = formElement.querySelector(settings.submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, settings);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', () => {
//       checkInputValidity(formElement, inputElement, settings);
//       toggleButtonState(inputList, buttonElement, settings);
//     })
//   });
// }

// function enableValidation(settings){
//   const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
//   formList.forEach((formElement) => {
//     setEventListener(formElement, settings);
//   })
// }

// enableValidation(settings);
