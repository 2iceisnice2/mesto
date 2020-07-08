//добавляем класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, popupCharObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(popupCharObj.inputErrorClass);;
  errorElement.textContent = errorMessage;
  errorElement.classList.remove(popupCharObj.errorClass);
};
//убираем класс с ошибкой
const hideInputError = (formElement, inputElement, popupCharObj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(popupCharObj.inputErrorClass);
  errorElement.classList.add(popupCharObj.errorClass);
  //убираем сообщения об ошибке 
  errorElement.textContent = '';
};
//Проверка валидности полей
const checkInputValidity = (formElement, inputElement, popupCharObj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupCharObj);
  } else {
    hideInputError(formElement, inputElement, popupCharObj);
  };
};

//меняем состояние кнопки
const toggleButtonState = (inputList, buttonElement, popupCharObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(popupCharObj.inactiveButtonClass);
    buttonElement.setAttribute('disabled','true');
  } else {
    buttonElement.classList.remove(popupCharObj.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};


const setEventListeners = (formElement, popupCharObj) => {
  const inputList = Array.from(formElement.querySelectorAll(popupCharObj.inputSelector));
  const buttonElement = formElement.querySelector(popupCharObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, popupCharObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, popupCharObj);
      toggleButtonState(inputList, buttonElement, popupCharObj);
    });
  });
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
     
    return !inputElement.validity.valid;
  });
};



const enableFormValidation = (popupCharObj) =>{
  // Найдём все формы с указанным классом в DOM
  const formList = Array.from(document.querySelectorAll(popupCharObj.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement)=>{
    // Для каждой формы вызовем функцию setEventListeners
    setEventListeners(formElement, popupCharObj);
  });
};

enableFormValidation(validationObj);

