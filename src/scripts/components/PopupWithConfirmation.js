import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmCallback = () => {};
    this._confirmButton = this._popup.querySelector('.popup__save-btn');
  }

  setSubmitAction(action) {
    this._confirmCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._confirmCallback();
    });
  }
}
