

export default class Card {
    constructor({item, handleCardClick}, cardSelector) {
      this._item = item;
      this._name = item.name;
      this._link = item.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }


    //Карточка
    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
        return cardElement;
      }



    //Метод лайков
      _likeActivation() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
      };

  //Удаление карточки
      _removeCard() {
        this._element.closest('.element').remove();
        this._removeEventListeners();
      }


      _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
          this._handleCardClick(this._item);
        });
        this._element.querySelector('.element__like').addEventListener('click', () => {
          this._likeActivation();
        });
        this._element.querySelector('.element__remove-button').addEventListener('click', () => {
          this._removeCard();
        });
      }


      _removeEventListeners() {
        this._element.querySelector('.element__remove-button').removeEventListener('click', () => {
          this._handleDelete();
        });
        this._element.querySelector('.element__like').removeEventListener('click', () => {
          this._toggleLike();
        });
        this._element.querySelector('.element__image').removeEventListener('click', () => {
          this._handleCardClick();
        });
      }




      generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._setEventListeners();
        this._element.querySelector('.element__name').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        return this._element;
      }
    }




