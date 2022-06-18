import './index.css';
import {
  profileEditButton,
  avatarEditButton,
  formElementProfile,
  formElementAvatar,
  popupAddCard,
  addCardButton,
  // likeButton,
  templateCard,
  // initialCards,
  settings,
  token,
  url
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from '../scripts/components/Section.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from '../scripts/components/Api.js';

const api = new Api(url, token);
api.getInitialCards()
  .then((initialCards) => {
    function renderCard(data) {
      const card = createCard(data);
      cardList.addItem(card);
    }

    const cardList = new Section({
      items: initialCards,
      renderer: (item) => {
        renderCard(item);
      }
    }, '.places__list');
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  })

api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
  })
  .catch((err) => {
    console.log(err);
  })

const profileFormValidation = new FormValidator(settings, formElementProfile);
profileFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(settings, popupAddCard);
addCardFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(settings, formElementAvatar);
avatarFormValidation.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_photo');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__about-me',
  avatarSelector: '.profile__photo'
});

const popupAvatarEdit = new PopupWithForm('.popup_type_avatar-edit', submitAvatar);
popupAvatarEdit.setEventListeners();

function submitAvatar() {
  console.log('this function change avatar!');
  popupAvatarEdit.close();
}

function openPopupAvatar() {
  avatarFormValidation.clearErrors(formElementAvatar);
  popupAvatarEdit.open();
}

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
avatarEditButton.addEventListener('click', openPopupAvatar);

function confirmCallback() {
  console.log('this is work too!')
  popupWithConfirmation.close();
}

const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirm', confirmCallback);
popupWithConfirmation.setEventListeners();

function createCard(data) {
  const card = new Card({
    data,
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleDeleteClick: () => {
      popupWithConfirmation.open();
    },
    handleLikeClick: () => {
      console.log(card._name);
    }}, templateCard);
  return card.generateCard();
}

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
