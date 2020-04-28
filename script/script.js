
const popup = document.querySelector('.popup'), 
popupToggle = document.querySelector('.profile__edit-button'), 
popupClose = document.querySelector('.popup__closed'), 
popupName = document.querySelector('.popup__input_name'), 
popupProfession = document.querySelector('.popup__input_profession'),
popupSubmit = document.querySelector('.popup__submit-btn'); 
 
const popupTitle = document.querySelector('.profile__title'),    
popupSubtitle = document.querySelector('.profile__subtitle'); 





function openPopup() { 
    popup.classList.add('popup_opened'); 
    popupName.value = popupTitle.textContent; 
    popupProfession.value = popupSubtitle.textContent; 
}; //открытие popup
 

function closePopup() { 
    popup.classList.remove('popup_opened'); 
}; //закрытие popup


 

let popupForm = document.querySelector('.popup__form'); 

function formSubmitHandler (evt) { 
evt.preventDefault();  
popupTitle.textContent = popupName.value; 
popupSubtitle.textContent = popupProfession.value; 
closePopup();
}; // отправка формы, измененние значений на странице



popupForm.addEventListener('submit', formSubmitHandler); 
popupClose.addEventListener('click', closePopup); 
popupToggle.addEventListener('click', openPopup); 