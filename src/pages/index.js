import './index.css';
import {
  profileEditButton,
  avatarEditButton,
  formElementProfile,
  formElementAvatar,
  popupAddCard,
  addCardButton,
  templateCard,
  settings,
  token,
  url,
} from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from '../scripts/components/Section.js';
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from '../scripts/components/Api.js';
let myId = "";
const api = new Api(url, token);

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data));
  }
}, '.places__list');

const popupWithFormCard = new PopupWithForm('.popup_type_add', submitFormCard);
popupWithFormCard.setEventListeners();

function submitFormCard(inputValues) {
  const data = {
    name: inputValues.title,
    link: inputValues.link
  };
  popupWithFormCard.renderLoading(true);
  api.setNewCard(data)
    .then((res) => {
      cardList.addItem(createCard(res));
      popupWithFormCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormCard.renderLoading(false);
    })
}

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    myId = userData._id;
    cardList.renderItems(initialCards.reverse());
    userInfo.setUserInfo(userData);
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

function submitAvatar(inputValues) {
  popupAvatarEdit.renderLoading(true);
  api.changeAvatar({ avatar: inputValues.avatar })
    .then((res) => {
      userInfo.setUserAvatar({ avatar: res.avatar });
      popupAvatarEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatarEdit.renderLoading(false);
    })
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
  popupWithFormProfile.renderLoading(true);
  api.setUserInfo(inputValues)
   .then((res) => {
      userInfo.setUserInfo(res);
      popupWithFormProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithFormProfile.renderLoading(false);
    })
}

profileEditButton.addEventListener('click', openPopupProfile);
avatarEditButton.addEventListener('click', openPopupAvatar);

const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirm');
popupWithConfirmation.setEventListeners();

function createCard(data) {
  const card = new Card({
    data: { ...data, userId: myId },
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleDeleteClick: () => {
      popupWithConfirmation.setSubmitAction(() => {
        api.deleteCard(card.getIdCard())
          .then(() => {
            card.deleteCard();
            popupWithConfirmation.close();
          })
          .catch((res) => {
            console.log(res);
          })
      });
      popupWithConfirmation.open();
    },
    handleLikeClick: () => {
      api.changeLikeCardStatus(card.getIdCard(), card.isLiked())
        .then((res) => {
          card.updateLikeCount(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, templateCard);
  return card.generateCard();
}

function handleAddCardButton() {
  addCardFormValidation.clearErrors(popupAddCard);
  popupWithFormCard.open();
}
addCardButton.addEventListener('click', handleAddCardButton);
