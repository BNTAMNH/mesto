import { Card } from "./Card.js";

const popupEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-btn');
const closeBtnEdit = document.querySelector('.popup__close-btn_type_edit');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const formElementProfile = document.querySelector('.popup__form_type_edit');
const inputName = document.getElementById('name');
const inputAboutMe = document.getElementById('about-me');
const placesList = document.querySelector('.places__list');
const popupAddCard = document.querySelector('.popup_type_add');
const addCardButton = document.querySelector('.profile__add-btn');
const inputTitleCard = document.getElementById('title');
const inputPhotoLink = document.getElementById('photo-link');
const formElementAddCard = popupAddCard.querySelector('.popup__form_type_add');
const popupCloseButtonAddCard = document.querySelector('.popup__close-btn_type_add');
const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImg = document.querySelector('.popup__photo');
const popupPhotoCaption = document.querySelector('.popup__caption');

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

function openPopup(element) {
  document.addEventListener('keydown', handleEscUp);
  element.classList.add('popup_opened')
}

function closePopup(element) {
  document.removeEventListener('keydown', handleEscUp);
  element.classList.remove('popup_opened');
}

function clearError(element) {
  const formElement = element.querySelector('.popup__form');
  const inputList = Array.from(element.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  })
}

function disableSubmitBtn(formElement, settings) {
  const button = formElement.querySelector(settings.submitButtonSelector);
  button.setAttribute('disabled', 'disabled');
  button.classList.add(settings.inactiveButtonClass);
}

function openPopupProfile() {
  clearError(popupEdit);
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
  openPopup(popupEdit);
}

function handleCloseButtonClick(evt) {
  if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-btn")) {
    closePopup(evt.target.closest(".popup"));
  }
}

function handleEscUp(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closePopup(popupEdit);
}

profileEditButton.addEventListener('click', openPopupProfile);
formElementProfile.addEventListener('submit', submitFormProfile);

function renderCard(data, placesList) {
  const card = new Card(data, '#place');
  placesList.prepend(card.generateCard());
}

initialCards.forEach(data => { renderCard(data, placesList); });

function openPopupAddCard() {
  clearError(popupAddCard);
  inputTitleCard.value = '';
  inputPhotoLink.value = '';
  openPopup(popupAddCard);
  disableSubmitBtn(popupAddCard, settings);
}
addCardButton.addEventListener('click', openPopupAddCard);

function submitFormAddCard(evt) {
  evt.preventDefault();
  const data = {
    name: inputTitleCard.value,
    link: inputPhotoLink.value
  }
  renderCard(data, placesList);
  closePopup(popupAddCard);
  evt.currentTarget.reset();
}

formElementAddCard.addEventListener('submit', submitFormAddCard);

export function openPopupPhoto(evt) {
  popupPhotoImg.src = evt.target.src;
  popupPhotoCaption.textContent = evt.target.alt;
  popupPhotoImg.alt = evt.target.alt;
  openPopup(popupPhoto);
}

popupEdit.addEventListener("click", handleCloseButtonClick);
popupAddCard.addEventListener("click", handleCloseButtonClick);
popupPhoto.addEventListener("click", handleCloseButtonClick);
