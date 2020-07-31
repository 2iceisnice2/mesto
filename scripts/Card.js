
import {openPopup, popupExpandedImage} from './util.js';

export default class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
        return cardElement;
      }

      _popupExpandedImage() {
        this._popupImage = document.querySelector('.popup__img');
        this._cardImage = this._element.querySelector('.element__image');
        this._popupImage.src = this._cardImage.src;
        document.querySelector('.popup__place').textContent = this._name;
        openPopup(popupExpandedImage);
      }

      _likeActivation() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
      };

      _removeCard() {
        this._trashButton = this._element.querySelector('.element__remove-button');
        this._trashButton.closest('.element').remove();
        this._trashButton.removeEventListener('click', () => {
          this._removeCard();
        });
        this._element.querySelector('.element__like').removeEventListener('click', () => {
          this._likeActivation();
        });
        this._element.querySelector('.element__image').removeEventListener('click', () => {
            this._popupExpandedImage();
        });
      }


      _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._popupExpandedImage();
        });
        this._element.querySelector('.element__like').addEventListener('click', () => {
          this._likeActivation();
        });
        this._element.querySelector('.element__remove-button').addEventListener('click', () => {
          this._removeCard();
        });
      }



      generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__name').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        return this._element;
      }




}