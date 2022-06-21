import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__save-btn');
    this._submitButtonDeafault = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputsList.forEach((input) => {
      input.value = data[input.id];
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._submitButton.textContent = 'Сохранение'
    } else {
      this._submitButton.textContent = this._submitButtonDeafault;
    }
  }
}
