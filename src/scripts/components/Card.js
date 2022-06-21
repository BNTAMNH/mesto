export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._like = data.likes;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardElement = document
      .querySelector(this._cardSelector).content
      .querySelector('.place').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.place__photo');
    this._likeButton = this._cardElement.querySelector('.place__like-btn');
    this._likeCounter = this._cardElement.querySelector('.place__like-counter');
    this._deleteButton = this._cardElement.querySelector('.place__trash-btn');
  }

  generateCard() {
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardElement.querySelector('.place__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._renderLikeCount();
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
    return this._cardElement;
  }

  getIdCard() {
    return this._cardId;
  }

  isLiked() {
   return this._like.find(item => item._id === this._userId);
  }

  _renderLikeCount() {
    this._likeCounter.textContent = this._like.length;

    if (this.isLiked()) {
      this._likeButton.classList.add('place__like-btn_active');
    } else {
      this._likeButton.classList.remove('place__like-btn_active');
    }
  }

  updateLikeCount(data) {
    this._like = data.likes;
    this._renderLikeCount();
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

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
