import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from './Section.js';
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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

const profileFormValidation = new FormValidator(settings, formElementProfile);
profileFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(settings, popupAddCard);
addCardFormValidation.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileAboutMe
});

const popupWithFormProfile = new PopupWithForm('.popup_type_edit', submitFormProfile);
popupWithFormProfile.setEventListeners();

function openPopupProfile() {
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());
  profileFormValidation.clearErrors(formElementProfile);
  popupWithFormProfile.open();
}

function submitFormProfile(inputValues) {
  userInfo.setUserInfo(inputValues);
  popupWithFormProfile.close();
}

profileEditButton.addEventListener('click', openPopupProfile);

function createCard(data) {
  const card = new Card({
    data,
    previewer: () => {
      popupWithImage.open(data);
    }}, templateCard);
  return card.generateCard();
}

function renderCard(data) {
  const card = createCard(data);
  cardList.addItem(card);
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCard(item);
  }
}, placesList);
cardList.renderItems();

const popupWithFormCard = new PopupWithForm('.popup_type_add', submitFormCard);
popupWithFormCard.setEventListeners();

function submitFormCard(inputValues) {
  const data = {
    name: inputValues.title,
    link: inputValues.link
  };
  renderCard(data);
  popupWithFormCard.close();
}

function handleAddCardButton() {
  addCardFormValidation.clearErrors(popupAddCard);
  popupWithFormCard.open();
}
addCardButton.addEventListener('click', handleAddCardButton);
