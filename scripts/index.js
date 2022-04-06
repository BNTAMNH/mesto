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

function openPopupProfile() {
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
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
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
  const placeTemplate = document.querySelector('#place').content;
  const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__photo');
  const titleCard = placeCard.querySelector('.place__title');
  photoCard.src = data.link;
  titleCard.textContent = data.name;
  photoCard.alt = data.name;
  const likeButton = placeCard.querySelector('.place__like-btn');
  likeButton.addEventListener('click', toggleLike);
  const trashButton = placeCard.querySelector('.place__trash-btn');
  trashButton.addEventListener('click', deleteCard);
  photoCard.addEventListener('click', openPopupPhoto);
  return placeCard;
}

function toggleLike(evt) {
  evt.target.classList.toggle('place__like-btn_active');
}

function deleteCard(evt) {
  evt.target.closest('.place').remove();
}

function renderCard(data, placesList) {
  const placeCard = createCard(data);
  placesList.prepend(placeCard);
}

initialCards.forEach(data => { renderCard(data, placesList); });

function openPopupAddCard() {
  inputTitleCard.value = '';
  inputPhotoLink.value = '';
  openPopup(popupAddCard);
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

function openPopupPhoto(evt) {
  popupPhotoImg.src = evt.target.src;
  popupPhotoCaption.textContent = evt.target.alt;
  popupPhotoImg.alt = evt.target.alt;
  openPopup(popupPhoto);
}

popupEdit.addEventListener("click", handleCloseButtonClick);
popupAddCard.addEventListener("click", handleCloseButtonClick);
popupPhoto.addEventListener("click", handleCloseButtonClick);
