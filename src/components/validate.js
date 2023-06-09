let optionsValidation = {
  // pageSelector: '.page',
  // formSelector: '.popup__form',
  // inputSelector: '.popup__form-item',
  // submitButtonSelector: '.popup__form-button-save',
  // linkID: 'place-link',
  // linkAvatarID: 'avatar-link',
  // inactiveButtonClass: 'popup__form-button-save_disabled',
  // inputErrorClass: 'popup__form-item_type-error',
  // errorClass: 'popup__form-item-error_active'
};

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
  if ((inputElement.validity.patternMismatch) || (inputElement.validity.typeMismatch)) {
    inputElement.setCustomValidity(inputElement.dataset.error);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    return true;
  } else {
    hideInputError(formElement, inputElement);
    return false;
  }
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
