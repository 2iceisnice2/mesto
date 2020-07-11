const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorSelector:'.popup__input-error',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_hidden'
};

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
const nameError = document.getElementById('name-input-error');
const jobError = document.getElementById('job-input-error');
const placeError = document.getElementById('place-input-error');
const linkError = document.getElementById('link-input-error');
const popupImgClose = document.querySelector('.popup__close_img');
const popupForm = document.querySelector('.popup__form_profile');
const popupInputPlace = document.querySelector('.popup__input_place');
const popupInputLink = document.querySelector('.popup__input_link');
const elementName = document.querySelector('.element__name');
const openImgPopup = document.querySelector('.popup__imgs');
const popupImage = document.querySelector('.popup__img');
const popupText = document.querySelector('.popup__place');
const popupSection = Array.from(document.querySelectorAll('.popup'));
const inputListForm = Array.from(document.querySelectorAll('.popup__input'));
const cardTemplate = document.querySelector('#card-template').content;



// открыть модальное окно 
function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup',setEscButtonHandler);
  document.addEventListener('mousedown',closePopupOverlayClick);
};



//закрыть модальное окно
function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keyup', setEscButtonHandler);
  document.removeEventListener('mousedown',closePopupOverlayClick);
};


//закрытие модального окна нажатием esc
function setEscButtonHandler (evt){
  if(evt.key==='Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
};
};



//закрытие модального окна по клику вне области
function closePopupOverlayClick (evt){
  if(evt.target.classList.contains('popup')){
    closePopup(evt.target);
  };
};



//редактирование профиля
function openProfilePopup() {
  openPopup(popup);
    popupName.value = popupTitle.textContent; 
    popupProfession.value = popupSubtitle.textContent;
    setInputsErrorClear(popup, validationObj);
    toggleButtonState(inputListForm, popupSubmit, validationObj);
};



//редактирование содержимого карточки
function openNewPlace() {
  setInputsErrorClear(submitPlace, validationObj);
  openPopup(submitPlace); 
    popupInputPlace.value = '';
    popupInputLink.value = '';
};



//открытие картинки
function openPic(imageElement) {
  openPopup(openImgPopup);
    popupImage.src = imageElement.src;
    popupText.textContent = imageElement.alt;
};


// отправка формы, измененние значений на странице
function formSubmitHandler (evt) { 
    evt.preventDefault();    
    popupTitle.textContent = popupName.value;    
    popupSubtitle.textContent = popupProfession.value;
    closePopup(popup);
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
  deleteElement.querySelector('.element__image').removeEventListener('click', openPic);
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

          imageElement.addEventListener('click', () => openPic(imageElement)); //открытие  картинки     

    return element;
    
   };


  

function addCard(card) {
    elements.prepend(createCard(card));   
};//добавление карточки в начало



initialCards.forEach(addCard); // добавление карточек из массива

const popupSubmitBtn = document.querySelector('.popup__submit-btn_place');

function placeSubmitHandler (evt) {
  evt.preventDefault();
  const card = createCard( { name: popupInputPlace.value, link: popupInputLink.value} );
  elements.prepend(card);
  closePopup(submitPlace);
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

