import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initialCards.js';
import {openPopup} from './util.js';
import {closePopup} from './util.js';
const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorSelector:'.popup__input-error',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_hidden'
  };


//import {initialCards} from './initialCards.js';

const popup = document.querySelector('.popup_profile-info'); 
const popupToggle = document.querySelector('.profile__edit-button'); 
const popupClose = document.querySelector('.popup__closed'); 
const popupName = document.querySelector('.popup__input_name'); 
const popupProfession = document.querySelector('.popup__input_profession');
const popupSubmit = document.querySelector('.popup__submit-btn'); 
const popupTitle = document.querySelector('.profile__title');    
const popupSubtitle = document.querySelector('.profile__subtitle'); 
const picPopup = document.querySelector('.popup__imgs');
const submitPlace = document.querySelector('.popup_new-place');
const elements = document.querySelector('.elements');
const popupNewPlace = document.querySelector('.profile__button');
const popupPlaceClose = document.querySelector('.popup__closed_new-place');
const popupImgClose = document.querySelector('.popup__close_img');
const popupForm = document.querySelector('.popup__form_profile');
const popupInputPlace = document.querySelector('.popup__input_place');
const popupInputLink = document.querySelector('.popup__input_link');
const openImgPopup = document.querySelector('.popup__imgs');
const popupImage = document.querySelector('.popup__img');
const popupText = document.querySelector('.popup__place');
const cardTemplate = document.querySelector('#card-template').content;
const formAddCard = document.querySelector('.popup__form_card');
const popupSubmitBtn = document.querySelector('.popup__submit-btn_place');


//вызов валидации
const formProfileValidator = new FormValidator(formConfig, popupForm);
formProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(formConfig, formAddCard);
formAddCardValidator.enableValidation();


//import {openPopup} from './util.js';
//import {closePopup} from './util.js';
  
  

function resetErrors(popupElement) {
  const errors = popupElement.querySelectorAll('.popup__input-error');
  errors.forEach(error => error.classList.add('popup__input-error_hidden'));
}



  
  //редактирование профиля
  function openProfilePopup() {
    resetErrors(popup)
    popupName.value = popupTitle.textContent; 
    popupProfession.value = popupSubtitle.textContent;
    openPopup(popup);
  };
  
  
  
  //редактирование содержимого карточки
  function openNewPlace() {
    resetErrors(submitPlace)
    popupInputPlace.value = '';
    popupInputLink.value = '';
    openPopup(submitPlace);
  };
  
  
  
  //открытие картинки
  function openPicPopup(imageElement) {
    popupImage.src = imageElement.src;
    popupText.textContent = imageElement.alt;
    openPopup(openImgPopup);
  };
  
  
  // отправка формы, измененние значений на странице
  function formSubmitHandler (evt) { 
      evt.preventDefault();    
      popupTitle.textContent = popupName.value;    
      popupSubtitle.textContent = popupProfession.value;
      closePopup(popup);
      popupSubmit.classList.add(formConfig.inactiveButtonClass);
      popupSubmit.disabled = true;
  };
  
  
  
  //функция для лайков
  function likeActivation(event) {
    event.target.classList.toggle('element__like_active');
  };
  
  
  
  //удаление карточки
  function removeCard(event) {
    const deleteElement = event.target.closest('.element');
    deleteElement.querySelector('.element__like').removeEventListener('click', likeActivation);
    deleteElement.querySelector('.element__remove-button').removeEventListener('click', removeCard);
    deleteElement.querySelector('.element__image').removeEventListener('click', openPicPopup);
    deleteElement.remove();
  };
  
  
  
  
  //создание карточки
  function createCard(item) {
      
      const element = cardTemplate.cloneNode(true);
      const imageElement = element.querySelector('.element__image');
            imageElement.src = item.link;
            element.querySelector('.element__name').textContent = item.name;
            imageElement.alt = item.name;
      const likeButton = element.querySelector('.element__like');
            likeButton.addEventListener('click', likeActivation);
      const removeButton = element.querySelector('.element__remove-button'); 
            removeButton.addEventListener('click', removeCard);
            imageElement.addEventListener('click', () => openPicPopup(imageElement)); //открытие  картинки     
  
      return element;
      
     };
  
  

  
  
  initialCards.forEach((item) => {
    const card = new Card(item, '#card-template');
    const cardElement = card.generateCard();
    elements.appendChild(cardElement);
  });
   // добавление карточек из массива
  
  
  function placeSubmitHandler (evt) {
    evt.preventDefault();
    const card = createCard( { name: popupInputPlace.value, link: popupInputLink.value} );
    elements.prepend(card);
    closePopup(submitPlace);
    popupSubmitBtn.classList.add(formConfig.inactiveButtonClass);
    popupSubmitBtn.disabled = true;
  }//добавляем карточку
    
  
  
  
  submitPlace.addEventListener('submit', placeSubmitHandler);
  popupForm.addEventListener('submit', formSubmitHandler); 
  popupClose.addEventListener('click',() => {
  closePopup(popup);
  }); 
  popupToggle.addEventListener('click', openProfilePopup);
  popupNewPlace.addEventListener('click', openNewPlace);
  popupPlaceClose.addEventListener('click',() =>{
  closePopup(submitPlace);
  });
  popupImgClose.addEventListener('click',() =>{
  closePopup(picPopup);
  });
  
  