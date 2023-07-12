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

let optionsModal = {
  // itemSelector: '.popup__form-item',
  // buttonSelector: '.popup__form-button-save',
  // popupSelector: '.popup',
  // openedFormClass: 'popup_opened',
  // popupClass: 'popup',
};

export function enableModal (options) {
  optionsModal = Object.assign({}, options);

  infoEditButton.addEventListener('click', setPopupOpened);
  editAvatar.addEventListener('click', editAvatarOpened);
  profilePopup.addEventListener('submit', handleFormSubmit);

  popupCloseButtons.forEach(button => {
    const popup = button.closest(optionsModal.popupSelector);

    button.addEventListener('click', () => closePopup(popup));
  });

  page.addEventListener('mousedown', function(evt) {
    closeHandler(evt);
  });

}

function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add(optionsModal.openedFormClass);
  page.addEventListener('keydown', closeByEscape);
}

function setPopupOpened() {
  nameInput.value = profileInfoNameText.textContent;
  descriptionInput.value = profileInfoDescription.textContent;

  const formInput = Array.from(profilePopup.querySelectorAll(optionsModal.itemSelector));
  const buttonElement = profilePopup.querySelector(optionsModal.buttonSelector);

  formInput.forEach((inputElement) => {
    checkInputValidity(profilePopup, inputElement);
  });
  if (buttonElement) {
    toggleButtonState(profilePopup, formInput, buttonElement);
  }

  openPopup(profilePopup);
}

function editAvatarOpened() {
  avatarLink.value = profileAvatar.src;

  const formInput = Array.from(popupAvatar.querySelectorAll(optionsModal.itemSelector));
  const buttonElement = popupAvatar.querySelector(optionsModal.buttonSelector);

  formInput.forEach((inputElement) => {
    checkInputValidity(popupAvatar, inputElement);
  });
  if (buttonElement) {
    toggleButtonState(popupAvatar, formInput, buttonElement);
  }
  openPopup(popupAvatar);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileInfoNameText.textContent = nameInput.value;
  profileInfoDescription.textContent = descriptionInput.value;
  closePopup(profilePopup);
}

export function closePopup(popup) {
  popup.classList.remove(optionsModal.openedFormClass);
  page.removeEventListener('keydown', closeByEscape);
}

function closeHandler(evt) {
  if (evt.target.classList.contains(optionsModal.popupClass)) {
    closePopup(evt.target);
  }
}
