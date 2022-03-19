const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = popup.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');
const formElement = popup.querySelector('.popup__form');
const inputName = document.getElementById('name');
const inputAboutMe = document.getElementById('about-me');

function openPopup() {
  inputName.value = profileName.textContent; //Подставляем имя в форму редактирования
  inputAboutMe.value = profileAboutMe.textContent; //Подставляем информацию "о себе" в форму редактирования
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

//Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value; //Меняем "имя" на странице на значение из формы
  profileAboutMe.textContent = inputAboutMe.value; //Меняем "о себе" на странице на значение из формы
  closePopup();
}

//Открытие формы редактирования
profileEditButton.addEventListener('click', openPopup);

//Закрытие формы редактирования на "крестик"
popupCloseButton.addEventListener('click', closePopup);

//Меняем данные на странице и закрываем форму кнопкой "Сохранить"
formElement.addEventListener('submit', formSubmitHandler);

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

