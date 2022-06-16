export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick }, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardElement = document
      .querySelector(this._cardSelector).content
      .querySelector('.place').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.place__photo');
    this._likeButton = this._cardElement.querySelector('.place__like-btn');
  }

  generateCard() {
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardElement.querySelector('.place__title').textContent = this._name;
    this._cardImage.alt = this._name;
    return this._cardElement;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('place__like-btn_active');
  }

  // _handleDeleteCard() {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  // }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
        this._handleLikeClick();
      });

    this._cardElement
      .querySelector('.place__trash-btn')
      .addEventListener('click', () => {
        this._handleDeleteClick();
      });

    this._cardImage
      .addEventListener('click', () => {
        this._handleCardClick({ link: this._link, name: this._name });
      });
  }
}
