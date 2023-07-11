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

import { enableValidation, checkInputValidity, toggleButtonState } from "../src/components/validate.js";

function openPopup(popup) {
  const formInput = Array.from(popup.querySelectorAll('.popup__form-item'));
  const buttonElement = popup.querySelector('.popup__form-button-save');
  formInput.forEach((inputElement) => {
    checkInputValidity(popup, inputElement, 'place-link', 'popup__form-item_type-error', 'popup__form-item-error_active');
  });
  if (buttonElement) {
    toggleButtonState(formInput, buttonElement, 'popup__form-button-save_disabled');
  }
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

enableValidation(
{ pageSelector: '.page',
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-button-save',
  linkID: 'place-link',
  inactiveButtonClass: 'popup__form-button-save_disabled',
  inputErrorClass: 'popup__form-item_type-error',
  errorClass: 'popup__form-item-error_active'
});
