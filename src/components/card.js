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

const placesElements = document.querySelector('.places__elements');
const newItemPopup = document.querySelector('.new-item-popup');
const newItemPopupForm = newItemPopup.querySelector('.popup__form');
const infoAddButton = document.querySelector('.profile__add-button');
const previewPopup = document.querySelector('.preview-popup');
const previewImage = previewPopup.querySelector('.popup__image');
const previewComment = previewPopup.querySelector('.popup__comment');

import {openPopup} from './modal.js';

export function enableCard() {
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
  addNewPlace(setPlaceElement(nameInput.value, descriptionInput.value));
  closePopup(newItemPopup);
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
  
function setNewItemPopupOpened() {
  newItemPopupForm.reset();
  openPopup(newItemPopup);
}
          