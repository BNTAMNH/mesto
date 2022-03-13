let popup = document.querySelector('.popup');
let profileEditButton = document.querySelector('.profile__edit-btn');
let popapCloseButton = popup.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let formElement = popup.querySelector('.popup__form');
let inputName = document.getElementById('name');
let inputAboutMe = document.getElementById('about-me');
let popupSaveButton = popup.querySelector('.popup__save-btn');

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
profileEditButton.addEventListener('click', function() {
  openPopup();
})

//Закрытие формы редактирования на "крестик"
popapCloseButton.addEventListener('click', function() {
  closePopup();
})

//Меняем данные на странице и закрываем форму кнопкой "Сохранить"
formElement.addEventListener('submit', formSubmitHandler);

