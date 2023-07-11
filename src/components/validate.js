/* options
{
  pageSelector: '.page',
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-button-save',
  linkID: 'place-link',
  inactiveButtonClass: 'popup__form-button-save_disabled',
  inputErrorClass: 'popup__form-item_type-error',
  errorClass: 'popup__form-item-error_active'
}
*/
const regNoValid = /[^\w\s\-\wа-я]|_/i;
const errorSymbol = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
const errorURL = 'Неправильный адрес сайта проверьте правильность введенного URL';

import { isValidHttpUrl } from './utils.js';

export function enableValidation(options) {
  const page = document.querySelector(options.pageSelector);
  const formList = Array.from(page.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, options);
  })
}

const setEventListener = (formElement, options) => {
  const formInput = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  formInput.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, options.linkID, options.inputErrorClass, options.errorClass);
      if (buttonElement) {
        toggleButtonState(formInput, buttonElement, options.inactiveButtonClass);
      }
    });
  });
}

export const checkInputValidity = (formElement, inputElement, linkID, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    console.log(inputElement.validationMessage);
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    return;
  }
  if (inputElement.id === linkID) {
    if (!isValidHttpUrl(inputElement.value)) {
      showInputError(formElement, inputElement, errorURL, inputErrorClass, errorClass);
    } else {
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
    return;
  }

  const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add(errorClass);
    }
  };

  const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    if (errorElement) {
      errorElement.classList.remove(errorClass);
      errorElement.textContent = '';
    }
  };

  if (regNoValid.test(inputElement.value)) {
    showInputError(formElement, inputElement, errorSymbol);
  }
  else {
    hideInputError(formElement, inputElement);
  }
};

export const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(formElement)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

const hasInvalidInput = (formElement) => {
  return formElement.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
