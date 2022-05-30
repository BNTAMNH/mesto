import './index.css';
import {
  profileEditButton,
  formElementProfile,
  placesList,
  popupAddCard,
  addCardButton,
  templateCard,
  initialCards,
  settings
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from '../scripts/components/Section.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

const profileFormValidation = new FormValidator(settings, formElementProfile);
profileFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(settings, popupAddCard);
addCardFormValidation.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__about-me'
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
    handleCardClick: () => {
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
