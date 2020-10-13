
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWhithForm.js';
import PopupWithImage from '../components/PopupWhithImage.js';
import PopupWithConfirm from'../components/PopupWhithConfirm.js';
import {formConfig,
        popup,
        popupToggle,
        popupName,
        popupProfession,
        profileTitle,
        profileSubtitle,
        submitPlace,
        elements,
        popupNewPlace,
        popupForm,
        formAddCard,
        popupExpandedImage,
        avatarFormButton,
        popupConfirmDelete,
        popupChangeAvatar,
        profileAvatar
      } from '../utils/constants.js';
import '../pages/index.css';
import Api from '../components/Api.js';


//вызов валидации
const formProfileValidator = new FormValidator(formConfig, popupForm);
const formAddCardValidator = new FormValidator(formConfig, formAddCard);
const formAvatarValidator = new FormValidator(formConfig, popupChangeAvatar);


//Pop-Up подтверждения
const popupWithConfirm = new PopupWithConfirm(popupConfirmDelete);



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'c157bcdf-cc24-47fa-ae84-1faa074ac4ef',
   'Content-Type': 'application/json'
  }
});


api.getAppInfo()
  .then(([ cardsArray, userData ]) => {


    const getCardData = (cardData) => {
      return {
        data: { ...cardData, myID: userData._id },
        handleCardClick: (cardData) => {
          popupWithImage.openPopup(cardData);
        },
        handleLikeClick: (card) => {
          const dataItem = data => {
          const index = cardsArray.findIndex(item => item._id === card.id());
          cardsArray.splice(index, 1, data);
          card.setLikesInfo({...data});
        }
          if(!card.isLiked()) {
            api.putLike(card.id())
              .then(dataItem)
          } else {
            api.removeLike(card.id())
              .then(dataItem)
          }
        },
        handleDeleteButtonClick: (card) => {
          popupWithConfirm.openPopup();
          popupWithConfirm.setSubmit(() => {
            api.removeCard(card.id())
              .then(() => {
                cardsArray = cardsArray.filter(item => {
                  return item._id !== card.id();
                });
                card.removeCard()
              })
              .catch((error) => console.error(error))
                popupWithConfirm.closePopup();
          });
        }
      }
    }

 
    const userInfo = new UserInfo({
      userName: profileTitle,
      userAbout: profileSubtitle,
      userAvatar: profileAvatar
    });


    userInfo.setUserInfo(userData);
    
// Pop-Up редактирования профиля
const popupWithProfileForm = new PopupWithForm({
  popupSelector: popup,
  handleFormSubmit: (data) => {
    api.setUserInfo({
      name: data.userName,
      about: data.userAbout
    })
      .then((userData) => {
        userInfo.setUserInfo(userData)
      })
      .catch((error) => console.error(error))
        popupWithProfileForm.closePopup(); 
  }
});


//Pop-Up  редактирования аватарки 
const popupWithAvatar = new PopupWithForm({
  popupSelector: popupChangeAvatar,
  handleFormSubmit: (data) => {
    api.setUserAvatar({
      avatar: data.userAvatar
    })
      .then((userData) => {
        userInfo.setUserInfo(userData)
        popupWithAvatar.closePopup();  
      });  
  }
});



//Pop-Up  добавления карточки 
const popupWithAddForm = new PopupWithForm({
  popupSelector: submitPlace,
  handleFormSubmit: (data) => {
    api.addNewCard(data)
      .then((cardData) => {
        const card = new Card(getCardData(cardData), '#card-template');
        cardList.addItem(card.generateCard());
      })
        popupWithAddForm.closePopup();
  }
}, formConfig);



  const cardList = new Section({
    items: cardsArray,
    renderer: (cardData) => {
      const card = new Card(getCardData(cardData), '#card-template');
      cardList.addItem(card.generateCard());
    }
  }, elements);


//Pop-Up полноразмерной картинки
  const popupWithImage = new PopupWithImage(popupExpandedImage); 
  popupWithImage.setEventListeners(); 


  return [ userInfo, 
    popupWithProfileForm, 
    popupWithAvatar, 
    popupWithAddForm, 
    cardList 
  ]
})
.then(([ userInfo, 
  popupWithProfileForm, 
  popupWithAvatar, 
  popupWithAddForm, 
  cardList ]) => {

  cardList.renderItems();

  popupWithProfileForm.setEventListeners();
  popupWithAddForm.setEventListeners();
  popupWithAvatar.setEventListeners();
  popupWithConfirm.setEventListeners();

  popupToggle.addEventListener('click', () => { 
    const thisUserInfo = userInfo.getUserInfo(); 
    popupName.value = thisUserInfo.userName;
    popupProfession.value = thisUserInfo.userAbout;
    popupWithProfileForm.openPopup(); 
    formProfileValidator.resetForm(); 
  }); 


  popupNewPlace.addEventListener('click', () => { 
    popupWithAddForm.openPopup(); 
    formAddCardValidator.resetForm(); 
  });

  avatarFormButton.addEventListener('click', () => {
    popupWithAvatar.openPopup();
  })
  })
  .catch((error) => console.error(error))
  .finally(() => {
    // Включить валидацию форм
    formProfileValidator.enableValidation();
    formAddCardValidator.enableValidation();
    formAvatarValidator.enableValidation();
  })




