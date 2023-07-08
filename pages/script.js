const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const infoEditButton = document.querySelector('.profile__info-edit-button');
const profilePopup = document.querySelector('.profile-popup');
const nameInput = profilePopup.querySelector('.popup__form-item_input_name');
const jobInput = profilePopup.querySelector('.popup__form-item_input_description');

const profileInfoNameText = document.querySelector('.profile__info-name-text');
const profileInfoDescription = document.querySelector('.profile__info-description');
const infoAddButton = document.querySelector('.profile__add-button');

const newItemPopup = document.querySelector('.new-item-popup');
const namePlace = newItemPopup.querySelector('.popup__form-item_input_name');
const linkPlace = newItemPopup.querySelector('.popup__form-item_input_description');
const newItemPopupForm = newItemPopup.querySelector('.popup__form');
const placesElements = document.querySelector('.places__elements');

const previewPopup = document.querySelector('.preview-popup');
const previewImage = previewPopup.querySelector('.popup__image');
const previewComment = previewPopup.querySelector('.popup__comment');

const popupCloseButtons = document.querySelectorAll('.popup__button-close');

const editAvatar = document.querySelector('.profile__avatar-edit');
const popupAvatar = document.querySelector('.avatar-popup');
const avatarLink = document.querySelector('.popup__form-item_avatar_link');
const profileAvatar = document.querySelector('.profile__avatar');

const page = document.querySelector('.page');

const regNoValid = /[^\w\s\-\wа-я]|_/i;
const errorSymbol = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
const errorURL = 'Неправильный адрес сайта проверьте правильность введенного URL';

function openPopup(popup) {
  const formInput = Array.from(popup.querySelectorAll('.popup__form-item'));
  const buttonElement = popup.querySelector('.popup__form-button-save');
  formInput.forEach((inputElement) => {
    checkInputValidity(popup, inputElement);
  });
  toggleButtonState(formInput, buttonElement);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function setPopupOpened() {
  nameInput.value = profileInfoNameText.textContent;
  jobInput.value = profileInfoDescription.textContent;
  openPopup(profilePopup);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileInfoNameText.textContent = nameInput.value;
  profileInfoDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

function setNewItemPopupOpened() {
  newItemPopupForm.reset();
  openPopup(newItemPopup);
}

function editAvatarOpened() {
  console.log(profileAvatar.src);
  avatarLink.value = profileAvatar.src;
  openPopup(popupAvatar);
}

function setPlaceElement(nameItemPlace, linkItemPlace) {
  const placeTemplate = document.querySelector('#place-element').content;
  const placeNew = placeTemplate.querySelector('.element-item').cloneNode(true);
  const imageElement = placeNew.querySelector('.element__image');

  placeNew.querySelector('.element__text').textContent = nameItemPlace;
  imageElement.alt = nameItemPlace;
  imageElement.src = linkItemPlace;
  imageElement.addEventListener('click', function(evt){
    previewComment.textContent = evt.target.closest('.element').querySelector('.element__text').textContent;
    previewImage.alt = evt.target.alt;
    previewImage.src = evt.target.src;

    openPopup(previewPopup);
  });

  placeNew.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
  placeNew.querySelector('.element__delete').addEventListener('click', function(evt) {
    evt.target.closest('.element-item').remove();
  });

  return placeNew;
}

function addNewPlace(newItem) {
  placesElements.prepend(newItem);
}

function handleNewItemFormSubmit(evt) {
  evt.preventDefault();
  addNewPlace(setPlaceElement(namePlace.value, linkPlace.value));
  closePopup(newItemPopup);
}

function closeHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

initialCards.forEach(function(card) {
  addNewPlace(setPlaceElement(card.name, card.link));
});

infoEditButton.addEventListener('click', setPopupOpened);
infoAddButton.addEventListener('click', setNewItemPopupOpened);
editAvatar.addEventListener('click', editAvatarOpened);
profilePopup.addEventListener('submit', handleFormSubmit);

newItemPopup.addEventListener('submit', handleNewItemFormSubmit);

popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
});

page.addEventListener('click', function(evt) {
  closeHandler(evt);
});

page.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelectorAll('.popup');
    popup.forEach(form => {
      closePopup(form);
    })
  }
});

// form validation

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__form-item_type-error');
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__form-item-error_active');
  }
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-item_type-error');
  if (errorElement) {
    errorElement.classList.remove('popup__form-item-error_active');
    errorElement.textContent = '';
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    return;
  }
  if (inputElement.id === 'place-link') {
    if (!isValidHttpUrl(inputElement.value)) {
      showInputError(formElement, inputElement, errorURL);
    } else {
      hideInputError(formElement, inputElement);
    }
    return;
  }

  if (regNoValid.test(inputElement.value)) {
    showInputError(formElement, inputElement, errorSymbol);
  }
  else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListener = (formElement) => {
  const formInput = Array.from(formElement.querySelectorAll('.popup__form-item'));
  const buttonElement = formElement.querySelector('.popup__form-button-save');
  formInput.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(formInput, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(page.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement);
  })
}

const hasInvalidInput = (formElement) => {
  return formElement.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (formElement, buttonElement) => {
  if (hasInvalidInput(formElement)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup_button-disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup_button-disabled');
  }
}

enableValidation();
