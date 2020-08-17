import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
 
 constructor(popupSelector) {
  super(popupSelector);
  this._popupImage = document.querySelector('.popup__img');
  this._popupPlace = document.querySelector('.popup__place'); 
 
}

openPopup(item) {
  this._popupImage.src = item.link;
  this._popupPlace.textContent = item.name;
  super.openPopup();
}







}