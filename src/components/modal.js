const infoEditButton = document.querySelector('.profile__info-edit-button');
const profilePopup = document.querySelector('.profile-popup');
const nameInput = profilePopup.querySelector('.popup__form-item_input_name');
const descriptionInput = profilePopup.querySelector('.popup__form-item_input_description');

const profileInfoNameText = document.querySelector('.profile__info-name-text');
const profileInfoDescription = document.querySelector('.profile__info-description');

const editAvatar = document.querySelector('.profile__avatar-edit');
const popupAvatar = document.querySelector('.avatar-popup');
const avatarLink = document.querySelector('.popup__form-item_avatar_link');
const profileAvatar = document.querySelector('.profile__avatar');

const page = document.querySelector('.page');

const popups = document.querySelectorAll('.popup')

import { checkInputValidity, toggleButtonState } from "./validate.js";
import { setUserInfo, setUserAvatar } from "./api.js";

let optionsModal = {
  // itemSelector: '.popup__form-item',
  // buttonSelector: '.popup__form-button-save',
  // popupSelector: '.popup',
  // openedFormClass: 'popup_opened',
  // popupClass: 'popup',
  // closeClass: 'popup__button-close',
};

export function enableModal (options) {
  optionsModal = Object.assign({}, options);

  infoEditButton.addEventListener('click', setPopupOpened);
  editAvatar.addEventListener('click', editAvatarOpened);
  profilePopup.addEventListener('submit', handleFormSubmit);
  popupAvatar.addEventListener('submit', handleAvatarSubmit);

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains(optionsModal.openedFormClass)) {
            closePopup(popup)
        }
        if (evt.target.classList.contains(optionsModal.closeClass)) {
          closePopup(popup)
        }
    })
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

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранить...';
  setUserAvatar(avatarLink.value)
    .then(result => {
      profileAvatar.src = result.avatar;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
  closePopup(popupAvatar);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const userData = {
    name: nameInput.value,
    about: descriptionInput.value
  };
  evt.submitter.textContent = 'Сохранить...';
  setUserInfo(userData)
    .then(result => {
      profileInfoNameText.textContent = result.name;
      profileInfoDescription.textContent = result.about;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.textContent = 'Сохранить';
    });
  closePopup(profilePopup);
}

export function closePopup(popup) {
  popup.classList.remove(optionsModal.openedFormClass);
  page.removeEventListener('keydown', closeByEscape);
}
