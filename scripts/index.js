import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from './Section.js';

const popupEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-btn');
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
const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImg = document.querySelector('.popup__photo');
const popupPhotoCaption = document.querySelector('.popup__caption');
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

function openPopup(element) {
  document.addEventListener('keydown', handleEscUp);
  element.classList.add('popup_opened')
}

function closePopup(element) {
  document.removeEventListener('keydown', handleEscUp);
  element.classList.remove('popup_opened');
}

function openPopupProfile() {
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
  profileFormValidation.clearErrors(formElementProfile);
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

function createCard(data) {
  const card = new Card(data, templateCard);
  return card.generateCard();
}

// old
// function renderCard(data, placesList) {
//   placesList.prepend(createCard(data));
// }
// initialCards.forEach(data => { renderCard(data, placesList); });

function renderCard(data) {
  const card = createCard(data);
  cardList.addItem(card);
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    renderCard(item);
    // const card = createCard(item);
    // cardList.addItem(card);
  }
}, placesList);
cardList.renderItems();


function openPopupAddCard() {
  inputTitleCard.value = '';
  inputPhotoLink.value = '';
  addCardFormValidation.clearErrors(popupAddCard);
  openPopup(popupAddCard);
}
addCardButton.addEventListener('click', openPopupAddCard);

function submitFormAddCard(evt) {
  evt.preventDefault();
  const data = {
    name: inputTitleCard.value,
    link: inputPhotoLink.value
  }
  renderCard(data);
  closePopup(popupAddCard);
  formElementAddCard.reset();
}

formElementAddCard.addEventListener('submit', submitFormAddCard);

function openPopupPhoto(evt) {
  popupPhotoImg.src = evt.target.src;
  popupPhotoCaption.textContent = evt.target.alt;
  popupPhotoImg.alt = evt.target.alt;
  openPopup(popupPhoto);
}
popupEdit.addEventListener("click", handleCloseButtonClick);
popupAddCard.addEventListener("click", handleCloseButtonClick);
popupPhoto.addEventListener("click", handleCloseButtonClick);

export {openPopupPhoto};
