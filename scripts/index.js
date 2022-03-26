const popupEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-btn');
const closeBtnEdit = document.querySelector('.popup__close-btn_type_edit');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const formElementProfile = document.querySelector('.popup__form_type_edit');
const inputName = document.getElementById('name');
const inputAboutMe = document.getElementById('about-me');

function openPopup(element) {
  element.classList.add('popup_opened')
}

function closePopup(element) {
  element.classList.remove('popup_opened');
}

function openPopupProfile() {
  inputName.value = profileName.textContent;
  inputAboutMe.value = profileAboutMe.textContent;
  openPopup(popupEdit);
}

function handleCloseButtonClick(evt) {
  closePopup(evt.target.closest('.popup') );
}

function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutMe.textContent = inputAboutMe.value;
  closePopup(popupEdit);
}

profileEditButton.addEventListener('click', openPopupProfile);
closeBtnEdit.addEventListener('click', handleCloseButtonClick);
formElementProfile.addEventListener('submit', submitFormProfile);


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


//Функция создающая карточку
function createCard(data) {
  const placeTemplate = document.querySelector('#place').content;
  const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__photo');
  const titleCard = placeCard.querySelector('.place__title');
  photoCard.src = data.link;
  titleCard.textContent = data.name;
  photoCard.alt = data.name;
  return placeCard;
}

//Функция переключения "лайка"
function toggleLike(evt) {
  evt.target.classList.toggle('place__like-btn_active');
}

//Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.place').remove();
}

//Находим контейнер для карточек
const placesList = document.querySelector('.places__list');

//Функция отрисовки карточек
function renderCard(data, placesList) {
  const placeCard = createCard(data);
  placesList.prepend(placeCard);
  const likeButton = document.querySelector('.place__like-btn');
  likeButton.addEventListener('click', toggleLike);
  const trashButton = document.querySelector('.place__trash-btn');
  trashButton.addEventListener('click', deleteCard);
  const photoCard = placeCard.querySelector('.place__photo');
  photoCard.addEventListener('click', openPopupPhoto);
}
//Отрисовка карточек "по умолчанию"
initialCards.forEach(data => { renderCard(data, placesList); });

const popupAddCard = document.querySelector('.popup_type_add');
const addCardButton = document.querySelector('.profile__add-btn');
function openPopupAddCard() {
  openPopup(popupAddCard);
}
addCardButton.addEventListener('click', openPopupAddCard);

const inputTitleCard = document.getElementById('title');
const inputPhotoLink = document.getElementById('photo-link');
const formElementAddCard = popupAddCard.querySelector('.popup__form_type_add');
const popupCloseButtonAddCard = document.querySelector('.popup__close-btn_type_add');

function submitFormAddCard(evt) {
  evt.preventDefault();
  renderCard({inputTitleCard, inputPhotoLink}, placesList);
  const titleCard = document.querySelector('.place__title');
  const photoCard = document.querySelector('.place__photo');
  titleCard.textContent = inputTitleCard.value;
  photoCard.src = inputPhotoLink.value;
  photoCard.alt = inputTitleCard.value;
  closePopup(popupAddCard);
  evt.currentTarget.reset();
}

popupCloseButtonAddCard.addEventListener('click', handleCloseButtonClick);
formElementAddCard.addEventListener('submit', submitFormAddCard);

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImg = document.querySelector('.popup__photo');
const popupPhotoCaption = document.querySelector('.popup__caption');

function openPopupPhoto(evt) {
  popupPhotoImg.src = evt.target.closest('.place__photo').src;
  popupPhotoCaption.textContent = evt.target.closest('.place__photo').alt;
  openPopup(popupPhoto);
}

const closeBtnPhoto = document.querySelector('.popup__close-btn_type_photo');
function closePopupPhoto() {
  closePopup(popupPhoto);
}

closeBtnPhoto.addEventListener('click', closePopupPhoto);
