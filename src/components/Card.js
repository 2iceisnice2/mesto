
   export default class Card {
    constructor({data, handleCardClick, handleLikeClick, handleDeleteButtonClick}, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._alt = data.alt;
      this._likes = data.likes;
      this._userId = data.myID;
      this._ownerId = data.owner._id;
      this._cardId = data._id;
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteButtonClick = handleDeleteButtonClick;
      this._cardSelector = cardSelector;
    }

    _getLikeCount() {
      this._element.querySelector('.element__like-count').textContent = this._likes.length;
      if (this.isLiked()) {
        this._element.querySelector('.element__like').classList.add('element__like_active');
      } else {
        this._element.querySelector('.element__like').classList.remove('element__like_active');
      }
    }
  
    isLiked() {
      return Boolean(this._likes.find(item => item._id === this._userId));
    }
  
    id() {
      return this._cardId;
    }
  
    setLikesInfo(data) {
      this._likes = data.likes;
      this._getLikeCount();
    }


    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
      return cardElement;
    }




    _renderButtons() {
      if(this._ownerId === this._userId) {
        this._element.querySelector('.element__remove-button').classList.add('element__remove-button_visible')
      } else {
        this._element.querySelector('.element__remove-button').classList.add('element__remove-button_hidden')
      }
    }


    removeCard() {
      this._element.remove();
      this._element = null;
    }



    _setEventListeners() {
      this._cardImage.addEventListener('click', () => {
        this._handleCardClick({
          link: this._link,
          alt: this._name
        });
      });
      this._element.querySelector('.element__like').addEventListener('click', () => {
        this._handleLikeClick(this);
      });
      this._element.querySelector('.element__remove-button').addEventListener('click', () => {
        this._handleDeleteButtonClick(this);
      });
    }


    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.element__image');
      this._getLikeCount();
      this._renderButtons();
      this._setEventListeners();
      this._element.querySelector('.element__name').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
  
      return this._element;
    }
  
   }




