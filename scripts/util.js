export const popupExpandedImage = document.querySelector('#img-fullsize');

// Закрыть Pop-Up при клике на ESC
export function setEscButtonHandler (evt){
    if(evt.key==='Escape'){
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
  };
  };


// Открыть Pop-Up
export function openPopup (popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup',setEscButtonHandler);
    document.addEventListener('mousedown',closePopupOverlayClick);
  };

// Закрыть Pop-Up
export function closePopup (popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', setEscButtonHandler);
    document.removeEventListener('mousedown',closePopupOverlayClick);
  };

  export function closePopupOverlayClick (evt){
    if(evt.target.classList.contains('popup')){
      closePopup(evt.target);
    };
  };
  