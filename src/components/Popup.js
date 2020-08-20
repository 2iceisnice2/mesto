export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleOverlayClose(event) {
    if (event.target.classList.contains('popup')) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').addEventListener('click', () => {
      this.closePopup();
    });
  }

  removeEventListeners() {
    this._popupSelector.querySelector('.popup__close-button').removeEventListener('click', () => {
      this.closePopup();
    });
    document.removeEventListener('mousedown', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  openPopup() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('mousedown', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this.removeEventListeners();
    this._popupSelector.classList.remove('popup_opened');
  }
}