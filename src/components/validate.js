let optionsValidation = {};

const regNoValid = /[^\w\s\-\wа-я]|_/i;
const errorSymbol = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
const errorURL = 'Неправильный адрес сайта проверьте правильность введенного URL';

import { isValidHttpUrl } from './utils.js';

export function enableValidation(options) {
  optionsValidation = Object.assign({}, options);
  const page = document.querySelector(optionsValidation.pageSelector);
  const formList = Array.from(page.querySelectorAll(optionsValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement);
  })
}

const setEventListener = (formElement) => {
  const formInput = Array.from(formElement.querySelectorAll(optionsValidation.inputSelector));
  const buttonElement = formElement.querySelector(optionsValidation.submitButtonSelector);
  formInput.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      if (buttonElement) {
        toggleButtonState(formElement, formInput, buttonElement);
      }
    });
  });
}

export const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    return true;
  }
  if (inputElement.id === optionsValidation.linkID) {
    if (!isValidHttpUrl(inputElement.value)) {
      showInputError(formElement, inputElement, errorURL);
      return true;
    } 
    hideInputError(formElement, inputElement);
    return false;
  }

  if (regNoValid.test(inputElement.value)) {
    showInputError(formElement, inputElement, errorSymbol);
    return true;
  }
  hideInputError(formElement, inputElement);
  return false;
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(optionsValidation.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(optionsValidation.errorClass);
  }
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(optionsValidation.inputErrorClass);
  if (errorElement) {
    errorElement.classList.remove(optionsValidation.errorClass);
    errorElement.textContent = '';
  }
};

export const toggleButtonState = (formElement, formInput, buttonElement) => {
  if (hasInvalidInput(formElement, formInput)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(optionsValidation.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(optionsValidation.inactiveButtonClass);
  }
}

const hasInvalidInput = (formElement, formInput) => {
  return formInput.some((inputElement) => {
    return checkInputValidity(formElement, inputElement);
  });
}
