const profileEditButton = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const formElementProfile = document.querySelector('.popup__form_type_edit');
const placesList = document.querySelector('.places__list');
const popupAddCard = document.querySelector('.popup_type_add');
const addCardButton = document.querySelector('.profile__add-btn');
const templateCard = '#place';

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

export {profileEditButton, profileName, profileAboutMe, formElementProfile, placesList, popupAddCard, addCardButton, templateCard, initialCards, settings};
