
const popup = document.querySelector('.popup'), 
      popupToggle = document.querySelector('.profile__edit-button'), 
      popupClose = document.querySelector('.popup__closed'), 
      popupName = document.querySelector('.popup__input_name'), 
      popupProfession = document.querySelector('.popup__input_profession'),
      popupSubmit = document.querySelector('.popup__submit-btn'); 
 
const popupTitle = document.querySelector('.profile__title'),    
      popupSubtitle = document.querySelector('.profile__subtitle'); 

const imagePopupButton = document.querySelector('.element__image');
const picPopup = document.querySelector('.popup__imgs');
const submitPlace = document.querySelector('.popup_new-place');
const elements = document.querySelector('.elements');


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



const popupPlace = document.querySelector('.popup_new-place');
const popupNewPlace = document.querySelector('.profile__button');
const popupPlaceClose = document.querySelector('.popup__closed_new-place');

const nameError = document.getElementById('name-input-error');
const jobError = document.getElementById('job-input-error');
const placeError = document.getElementById('place-input-error');
const linkError = document.getElementById('link-input-error');

function showPopup(popupName) { 
    if (popupName.classList.contains('popup')) {
        popupName.classList.toggle('popup_opened');
    };

nameError.textContent = '';
jobError.textContent = '';
placeError.textContent = '';
linkError.textContent = '';
};




function openNewPlace() {
   showPopup(submitPlace); 
    popupInputPlace.value = '';
    popupInputLink.value = '';
}; //редактирование содержимого карточки


const popupImgClose = document.querySelector('.popup__close_img');
popupImgClose.addEventListener('click', closeImg);
function closeImg() {
   showPopup(picPopup)
};


function openPopup() {
    showPopup(popup);
    popupName.value = popupTitle.textContent; 
   popupProfession.value = popupSubtitle.textContent;
}; //редактирование профиля
 

const popupForm = document.querySelector('.popup__form_profile'); 

function formSubmitHandler (evt) { 
    evt.preventDefault();    
    popupTitle.textContent = popupName.value;    
    popupSubtitle.textContent = popupProfession.value;

    openPopup();
}; // отправка формы, измененние значений на странице

const popupInputPlace = document.querySelector('.popup__input_place');
const popupInputLink = document.querySelector('.popup__input_link');


function likeActivation(event) {
  event.target.classList.toggle('element__like_active');
}//функция для лайков


function removeCard(event) {
  const deleteElement = event.target.closest('.element');
        deleteElement.remove();
}  //удаление карточки


const elementName = document.querySelector('.element__name');


function openPic(imageElement) {
  showPopup(openImgPopup);

  popupImage.src = imageElement.src;
  popupText.textContent = imageElement.alt;
 
}//открытие картинки

const openImgPopup = document.querySelector('.popup__imgs');
const popupImage = document.querySelector('.popup__img');
const popupText = document.querySelector('.popup__place');


function createCard(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const element = cardTemplate.cloneNode(true);
          element.querySelector('.element__image').src = item.link;
          element.querySelector('.element__name').textContent = item.name;
          element.querySelector('.element__image').alt = item.name;

    const likeButton = element.querySelector('.element__like');
          likeButton.addEventListener('click', likeActivation);

    const removeButton = element.querySelector('.element__remove-button'); 
          removeButton.addEventListener('click', removeCard);

    const imageElement = element.querySelector('.element__image');
          imageElement.addEventListener('click', (showPopup) => openPic(imageElement)); //открытие  картинки     

    return element;
   };


   function addCard(object) {
    elements.prepend(createCard(object));   
}//добавление карточек из массива



initialCards.forEach(object => addCard(object));



function placeSubmitHandler (evt) {
  evt.preventDefault();
  const card = createCard( { name: popupInputPlace.value, link: popupInputLink.value} );
  elements.prepend(card);

  showPopup(submitPlace);
}//добавляем карточку
  




function outsideClickPopup(e) {
    if (e.target == popup) {
      showPopup(popup)
    }
  }


  function outsideClickPlace(e) {
    if (e.target == submitPlace) {
      showPopup(submitPlace)
    }
  }

  function outsideClickImg(e) {
    if (e.target == openImgPopup) {
      showPopup(openImgPopup)
    }
  }//закрытие модального окна кликом вне области


  window.addEventListener('mousedown', outsideClickPopup);
  window.addEventListener('mousedown', outsideClickPlace);
  window.addEventListener('mousedown', outsideClickImg);


  document.body.addEventListener('keyup', function (e) {
    const key = e.keyCode;

    if (key == 27) {
        document.querySelector('.popup').classList.remove('popup_opened');
        document.querySelector('.popup__imgs').classList.remove('popup_opened');
        document.querySelector('.popup_new-place').classList.remove('popup_opened'); 
    };

}, false);// закрытие форм esc





submitPlace.addEventListener('submit', placeSubmitHandler);
popupForm.addEventListener('submit', formSubmitHandler); 
popupClose.addEventListener('click', openPopup); 
popupToggle.addEventListener('click', openPopup); 
popupNewPlace.addEventListener('click', openNewPlace);
popupPlaceClose.addEventListener('click', openNewPlace);


