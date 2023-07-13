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

import { checkInputValidity, toggleButtonState } from './validate.js';

const placesElements = document.querySelector('.places__elements');
const newItemPopup = document.querySelector('.new-item-popup');
const newItemPopupForm = newItemPopup.querySelector('.popup__form');
const infoAddButton = document.querySelector('.profile__add-button');
const previewPopup = document.querySelector('.preview-popup');
const previewImage = previewPopup.querySelector('.popup__image');
const previewComment = previewPopup.querySelector('.popup__comment');
const nameCard = newItemPopup.querySelector('.popup__form-item_input_name');
const linkCard = newItemPopup.querySelector('.popup__form-item_input_description');

let optionsCard = {
//    placeElementID: '#place-element',
//    elementSelector: '.element-item',
//    imageSelector: '.element__image',
//    textSelector: '.element__text',
//    elementSelector: '.element',
//    likeSelector: '.element__like',
//    deleteSelector: '.element__delete',
//    activeLikeClass: 'element__like_active',
//    buttonSelector: '.popup__form-button-save',
}

import { openPopup, closePopup } from './modal.js';

export function enableCard(options) {
  optionsCard = Object.assign({}, options);

  initialCards.forEach(function(card) {
    addNewPlace(setPlaceElement(card.name, card.link));
  });
  newItemPopup.addEventListener('submit', handleNewItemFormSubmit);
  infoAddButton.addEventListener('click', setNewItemPopupOpened);
}

function addNewPlace(newItem) {
  placesElements.prepend(newItem);
}

function handleNewItemFormSubmit(evt) {
  evt.preventDefault();
  addNewPlace(setPlaceElement(nameCard.value, linkCard.value));
  closePopup(newItemPopup);
}

function setPlaceElement(nameItemPlace, linkItemPlace) {
  const placeTemplate = document.querySelector(optionsCard.placeElementID).content;
  const placeNew = placeTemplate.querySelector(optionsCard.elementSelector).cloneNode(true);
  const imageElement = placeNew.querySelector(optionsCard.imageSelector);

  placeNew.querySelector(optionsCard.textSelector).textContent = nameItemPlace;
  imageElement.alt = nameItemPlace;
  imageElement.src = linkItemPlace;
  imageElement.addEventListener('click', function(evt){
    previewComment.textContent = evt.target.closest(optionsCard.elementSelector).querySelector(optionsCard.textSelector).textContent;
    previewImage.alt = evt.target.alt;
    previewImage.src = evt.target.src;

    openPopup(previewPopup);
  });

  placeNew.querySelector(optionsCard.likeSelector).addEventListener('click', function(evt) {
    evt.target.classList.toggle(optionsCard.activeLikeClass);
  });
  placeNew.querySelector(optionsCard.deleteSelector).addEventListener('click', function(evt) {
    evt.target.closest(optionsCard.elementSelector).remove();
  });

  return placeNew;
}

function setNewItemPopupOpened() {
  newItemPopupForm.reset();

  const formInput = Array.from(newItemPopupForm.querySelectorAll(optionsCard.itemSelector));
  const buttonElement = newItemPopupForm.querySelector(optionsCard.buttonSelector);

  formInput.forEach((inputElement) => {
    checkInputValidity(newItemPopupForm, inputElement);
  });
  if (buttonElement) {
    toggleButtonState(newItemPopupForm, formInput, buttonElement);
  }

  openPopup(newItemPopup);
}
