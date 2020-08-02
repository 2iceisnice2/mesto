export default class FormValidator {
  constructor(formConfig, formElement) {
    this._formConfig = formConfig;
    this._formElement = formElement;
  }
//добавляем класс с ошибкой 
 _showInputError(formElement, inputElement, errorMessage, formConfig) { 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
  inputElement.classList.add(formConfig.inputErrorClass);; //
  errorElement.textContent = errorMessage; 
  errorElement.classList.add(formConfig.errorClass); 
}; 
 
//убираем класс с ошибкой 
_hideInputError(formElement, inputElement, formConfig) { 
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
  inputElement.classList.remove(formConfig.inputErrorClass); //
  errorElement.classList.remove(formConfig.errorClass); 
  //убираем сообщения об ошибке  
  errorElement.textContent = ''; 
}; 
 
//Проверка валидности полей 
_checkInputValidity(formElement, inputElement, formConfig) { 
  if (!inputElement.validity.valid) { 
    this._showInputError(formElement, inputElement, inputElement.validationMessage, formConfig); 
  } else { 
    this._hideInputError(formElement, inputElement, formConfig); 
  }; 
}; 

 
_hasInvalidInput(inputList) { 
  return inputList.some((inputElement) => { 
      
    return !inputElement.validity.valid; 
  }); 
}; 


//меняем состояние кнопки 
_toggleButtonState(inputList, buttonElement, formConfig) { 
  if (this._hasInvalidInput(inputList)) { 
    buttonElement.classList.add(formConfig.inactiveButtonClass); 
    buttonElement.disabled = true; 
  } else { 
    buttonElement.classList.remove(formConfig.inactiveButtonClass); 
    buttonElement.disabled = false; 
  }; 
}; 
 

 
_setEventListeners(formElement, formConfig) { 
  const inputList = Array.from(formElement.querySelectorAll(formConfig.inputSelector)); 
  const buttonElement = formElement.querySelector(formConfig.submitButtonSelector); 
  this._toggleButtonState(inputList, buttonElement, formConfig); 
  inputList.forEach((inputElement) => { 
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(formElement, inputElement, formConfig); 
      this._toggleButtonState(inputList, buttonElement, formConfig); 
    }); 
  }); 
}; 
 
 
 
enableValidation() {
  this._setEventListeners(this._formElement, this._formConfig);
}
 
}
