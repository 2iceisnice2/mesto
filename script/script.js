
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

const card = [{}];
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

function openNewPlace() { 
    if (popupPlace.classList.contains('popup_disabled')) {
        popupPlace.classList.remove('popup_disabled');
        popupPlace.classList.add('popup_opened');
    } else {
        popupPlace.classList.add('popup_disabled');
    } 
    popupInputPlace.value = '';
    popupInputLink.value = '';
}; //редактирование содержимого карточки


const popupImgClose = document.querySelector('.popup__close_img');
popupImgClose.addEventListener('click', closeImg);
function closeImg() {
    picPopup.classList.add('popup_disabled');
};


function openPopup() {
    if (popup.classList.contains('popup_disabled')) {
        popup.classList.remove('popup_disabled');  
        popup.classList.add('popup_opened');
    } else {
        popup.classList.add('popup_disabled');
    } 
    popupName.value = popupTitle.textContent; 
    popupProfession.value = popupSubtitle.textContent; 
}; //редактирование профиля
 

let popupForm = document.querySelector('.popup__form_profile'); 

function formSubmitHandler (evt) { 
    evt.preventDefault();    
    popupTitle.textContent = popupName.value;    
    popupSubtitle.textContent = popupProfession.value;

    openPopup();
}; // отправка формы, измененние значений на странице

const popupInputPlace = document.querySelector('.popup__input_place');
const popupInputLink = document.querySelector('.popup__input_link');
function placeSubmitHandler (evt) {
    evt.preventDefault();    
    card[0].link = popupInputLink.value;    
    card[0].name = popupInputPlace.value; 
    publicCards(card);
    openNewPlace();
};//добавляем карточку
   

function addCard(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const element = cardTemplate.cloneNode(true);
        element.querySelector('.element__image').src = item.link;
        element.querySelector('.element__name').textContent = item.name;

    const likeButton = element.querySelector('.element__like');
        likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
        });//ставим лайки

    const removeButton = element.querySelector('.element__remove-button');
        removeButton.addEventListener('click', function(){
        removeButton.parentElement.remove();
        });//удаление карточки

    const openPic = element.querySelector('.element__image');
        openPic.addEventListener('click', function (evt) {
        picPopup.classList.add('popup_opened');
        picPopup.classList.remove('popup_disabled');
        picPopup.querySelector('.popup__img').src = evt.target.src;
        picPopup.querySelector('.popup__place').textContent = item.name;
    }); //открытие  картинки     

    return element;
   };

   function publicCards(initialCards) {
        initialCards.forEach(function (card) {
        elements.prepend(addCard(card))
    });
  };

submitPlace.addEventListener('submit', placeSubmitHandler);
popupForm.addEventListener('submit', formSubmitHandler); 
popupClose.addEventListener('click', openPopup); 
popupToggle.addEventListener('click', openPopup); 
popupNewPlace.addEventListener('click', openNewPlace);
popupPlaceClose.addEventListener('click', openNewPlace);




publicCards(initialCards)
   