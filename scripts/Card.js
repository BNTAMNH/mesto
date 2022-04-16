import { openPopupPhoto } from "./index.js";

class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const CardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return CardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__photo').src = this._link;
    this._element.querySelector('.place__title').textContent = this._name;
    this._element.querySelector('.place__photo').alt = this._name;
    return this._element;
  }

  _handleLikeClick() {
    this._element
      .querySelector('.place__like-btn')
      .classList.toggle('place__like-btn_active');
  }

  _handleDeleteCard() {
    this._element.closest('.place').remove();
  }

  _setEventListeners() {
    this._element
      .querySelector('.place__like-btn')
      .addEventListener('click', () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector('.place__trash-btn')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector('.place__photo')
      .addEventListener('click', openPopupPhoto);
  }

}

//добавить обработчики, добавить слушатели событий
