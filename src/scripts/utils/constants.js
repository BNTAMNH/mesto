const profileEditButton = document.querySelector('.profile__edit-btn');
const avatarEditButton = document.querySelector('.profile__photo-btn');
const formElementProfile = document.querySelector('.popup__form_type_edit');
const formElementAvatar = document.querySelector('.popup__form_type_avatar');
const popupAddCard = document.querySelector('.popup_type_add');
const addCardButton = document.querySelector('.profile__add-btn');
const likeButton = document.querySelector('.place__like-btn');
const templateCard = '#place';
const token = '233a8c63-1700-4115-a0b1-8a186f84e03d';
const url = 'https://mesto.nomoreparties.co/v1/cohort-43';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_type_disabled',
  inputErrorClass: 'popup__input_type_invalid',
  errorClass: 'popup__input-error_active'
};

export {profileEditButton, avatarEditButton, formElementProfile, formElementAvatar, popupAddCard, addCardButton, likeButton, templateCard, initialCards, settings, token, url};
