let popup = document.querySelector('.popup');
let openPopup = document.querySelector('.profile__edit-btn');
let closePopup  = popup.querySelector('.popup__close-btn');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let formElement = popup.querySelector('.popup__form');
let inputName = document.getElementById('name');
let inputAboutMe = document.getElementById('about-me');
let savePopup = popup.querySelector('.popup__save-btn');

//Открытие формы редактирования
openPopup.addEventListener('click', function() {
  popup.classList.add('popup_opened');

  inputName.value = profileName.textContent; //Подставляем имя в форму редактирования
  inputAboutMe.value = profileAboutMe.textContent; //Подставляем информацию "о себе" в форму редактирования
})

//Закрытие формы редактирования на "крестик"
closePopup.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})

//Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value; //Меняем "имя" на странице на значение из формы
  profileAboutMe.textContent = inputAboutMe.value; //Меняем "о себе" на странице на значение из формы
}

//Меняем данные на странице и закрываем форму кнопкой "Сохранить"
formElement.addEventListener('submit', formSubmitHandler);
savePopup.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
})
