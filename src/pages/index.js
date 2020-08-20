

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from '../utils/initialCards.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWhithForm.js';
import PopupWithImage from '../components/PopupWhithImage.js';
import {formConfig,
        popup,
        popupToggle,
        popupName,
        popupProfession,
        popupTitle,
        popupSubtitle,
        submitPlace,
        elements,
        popupNewPlace,
        popupForm,
        popupInputPlace,
        popupInputLink,
        formAddCard,
        popupExpandedImage} from '../utils/constants.js';

import '../pages/index.css';

//вызов валидации
const formProfileValidator = new FormValidator(formConfig, popupForm);
formProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(formConfig, formAddCard);
formAddCardValidator.enableValidation();



const userInfo = new UserInfo({
  user: {
    name: popupTitle,
    about: popupSubtitle
  },
  input: {
    name: popupName,
    about: popupProfession
  }
});



 //Pop-Up редактирования профиля
 const popupWithProfileForm = new PopupWithForm({
  popupSelector: popup,
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
  }
});
popupWithProfileForm.setEventListeners();


//Pop-Up полноразмерной картинки
const popupWithImage = new PopupWithImage(popupExpandedImage);
popupWithImage.setEventListeners();



//Карточки из массива

const addCards = (data) => {
  const initialCardsList = new Section({
    items: data, renderer: (item) => {
      const card = new Card({
          item,
          handleCardClick: (event) => {
            popupWithImage.openPopup(event);
          }
        }, '#card-template');
      const cardElement = card.generateCard();
      initialCardsList.addItem(cardElement);
    }
  }, elements);
  initialCardsList.renderItems();
}
addCards(initialCards);


//Pop-Up  добавления карточки

const popupWithAddForm = new PopupWithForm({  
  popupSelector: submitPlace, handleFormSubmit: () => {
    const newCard = [{ name: popupInputPlace.value, link: popupInputLink.value }];
    addCards(newCard);
    popupWithAddForm.closePopup();
  }
});
popupWithAddForm.setEventListeners();




popupToggle.addEventListener('click', () => {
  userInfo.getUserInfo();
  popupWithProfileForm.openPopup();
  formProfileValidator.resetForm();
});
popupNewPlace.addEventListener('click', () => {
  popupWithAddForm.openPopup();
  formAddCardValidator.resetForm();
});


