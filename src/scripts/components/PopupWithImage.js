import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__photo');
    this._imageCaption = this._popup.querySelector('.popup__caption');
  }

  open(data) {
    this._image.src = data.link;
    this._imageCaption.textContent = data.name;
    this._image.setAttribute('alt', data.name);
    super.open();
  }
}
