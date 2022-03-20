const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const formElementProfile = popupEditProfile.querySelector('.popup__form');
const inputName = document.getElementById('name');
const inputAboutMe = document.getElementById('about-me');

function openPopupProfile() {
  inputName.value = profileName.textContent; //Подставляем имя в форму редактирования
  inputAboutMe.value = profileAboutMe.textContent; //Подставляем информацию "о себе" в форму редактирования
  popupEditProfile.classList.add('popup_opened');
}

function closePopupProfile() {
  popupEditProfile.classList.remove('popup_opened');
}

//Обработчик «отправки» формы
function submitFormProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value; //Меняем "имя" на странице на значение из формы
  profileAboutMe.textContent = inputAboutMe.value; //Меняем "о себе" на странице на значение из формы
  closePopupProfile();
}

//Открытие формы редактирования
profileEditButton.addEventListener('click', openPopupProfile);

//Закрытие формы редактирования на "крестик"
popupCloseButton.addEventListener('click', closePopupProfile);

//Меняем данные на странице и закрываем форму кнопкой "Сохранить"
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

const placesList = document.querySelector('.places__list');

const createCard = (data) => {
  const placeTemplate = document.querySelector('#place').content;
  const placeCard = placeTemplate.querySelector('.place').cloneNode(true);
  const photoCard = placeCard.querySelector('.place__photo');
  const titleCard = placeCard.querySelector('.place__title');
  photoCard.src = data.link;
  titleCard.textContent = data.name;
  photoCard.alt = data.name;
  return placeCard;
}

const renderCard = (data, placesList) => {
  const placeCard = createCard(data);
  placesList.prepend(placeCard);
}

initialCards.forEach(data => { renderCard(data, placesList); });

const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.profile__add-btn');
const openPopupAddCard = () => {
  popupAddCard.classList.add('popup_opened');
}
addCardButton.addEventListener('click', openPopupAddCard);

const closePopupAddCard = () => {
  popupAddCard.classList.remove('popup_opened');
}

const popupCloseButtonAddCard = document.querySelector('.popup__close-btn_type_add-card');
popupCloseButtonAddCard.addEventListener('click', closePopupAddCard);

const inputTitleCard = document.getElementById('title');
const inputPhotoLink = document.getElementById('photo-link');
const formElementAddCard = popupAddCard.querySelector('.popup__form');

function submitFormAddCard(evt) {
  evt.preventDefault();
  renderCard({inputTitleCard, inputPhotoLink}, placesList);
  const titleNewCard = document.querySelector('.place__title');
  const photoNewCard = document.querySelector('.place__photo');
  titleNewCard.textContent = inputTitleCard.value;
  photoNewCard.src = inputPhotoLink.value;
  photoNewCard.alt = inputTitleCard.value;
  closePopupAddCard();
}

formElementAddCard.addEventListener('submit', submitFormAddCard);
