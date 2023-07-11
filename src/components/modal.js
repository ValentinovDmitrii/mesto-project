const infoEditButton = document.querySelector('.profile__info-edit-button');
const profilePopup = document.querySelector('.profile-popup');
const nameInput = profilePopup.querySelector('.popup__form-item_input_name');
const descriptionInput = profilePopup.querySelector('.popup__form-item_input_description');

const profileInfoNameText = document.querySelector('.profile__info-name-text');
const profileInfoDescription = document.querySelector('.profile__info-description');

const popupCloseButtons = document.querySelectorAll('.popup__button-close');

const editAvatar = document.querySelector('.profile__avatar-edit');
const popupAvatar = document.querySelector('.avatar-popup');
const avatarLink = document.querySelector('.popup__form-item_avatar_link');
const profileAvatar = document.querySelector('.profile__avatar');

const page = document.querySelector('.page');

import { checkInputValidity, toggleButtonState } from "./validate.js";

let optionsModal = {};

export function enableModal (options) {
  optionsModal = Object.assign({}, options);

  infoEditButton.addEventListener('click', setPopupOpened);
  editAvatar.addEventListener('click', editAvatarOpened);
  profilePopup.addEventListener('submit', handleFormSubmit);
  
  popupCloseButtons.forEach(button => {
    const popup = button.closest(optionsModal.popupSelector);
  
    button.addEventListener('click', () => closePopup(popup));
  });
  
  page.addEventListener('click', function(evt) {
    closeHandler(evt);
  });
  
  page.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelectorAll(optionsModal.popupSelector);
      popup.forEach(form => {
        closePopup(form);
      })
    }
  });
}

export function openPopup(popup) {
  const formInput = Array.from(popup.querySelectorAll(optionsModal.itemSelector));
  const buttonElement = popup.querySelector(optionsModal.buttonSelector);
  formInput.forEach((inputElement) => {
    checkInputValidity(popup, inputElement);
  });
  if (buttonElement) {
    toggleButtonState(popup, formInput, buttonElement);
  }
  popup.classList.add(optionsModal.openedFormClass);
}

function setPopupOpened() {
  nameInput.value = profileInfoNameText.textContent;
  descriptionInput.value = profileInfoDescription.textContent;
  openPopup(profilePopup);
}

function editAvatarOpened() {
  avatarLink.value = profileAvatar.src;
  openPopup(popupAvatar);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileInfoNameText.textContent = nameInput.value;
  profileInfoDescription.textContent = descriptionInput.value;
  closePopup(profilePopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closeHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}
