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
const profileName = document.querySelector('.profile__info-name-text');
const profileDescription = document.querySelector('.profile__info-description');
const profileAvatar = document.querySelector('.profile__avatar');


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
//    counterSelector: '.element__like-counter',
}

let userId = '';

import { openPopup, closePopup } from './modal.js';
import { getInitialCards, addCard, getUserInfo, deleteCard, likeCard, unlikeCard } from './api.js';
import { renderLoading } from './utils.js';

export function enableCard(options) {
  optionsCard = Object.assign({}, options);

  Promise.all([
    getUserInfo(),
    getInitialCards()
  ])
    .then(values => {
      profileName.textContent = values[0].name;
      profileDescription.textContent = values[0].about;
      profileAvatar.src = values[0].avatar;
      userId = values[0]._id;

      values[1].forEach(card => {
        addNewPlace(setPlaceElement(card.name, card.link, card.likes.length, card.owner._id, card._id));
      });
    })
    .catch(err => {
      console.log(err);
    });

  newItemPopup.addEventListener('submit', handleNewItemFormSubmit);
  infoAddButton.addEventListener('click', setNewItemPopupOpened);
}

function addNewPlace(newItem) {
  placesElements.prepend(newItem);
}

function handleNewItemFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: nameCard.value,
    link: linkCard.value
  };
  renderLoading(evt.submitter, 'Создать', true);
  addCard(card)
    .then(result => {
      addNewPlace(setPlaceElement(result.name, result.link, 0, result.owner._id, result._id));
      closePopup(newItemPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(evt.submitter, 'Создать', true);
    });
}

function setPlaceElement(nameItemPlace, linkItemPlace, countLikes, ownerId, placeId) {
  const placeTemplate = document.querySelector(optionsCard.placeElementID).content;
  const placeNew = placeTemplate.querySelector(optionsCard.elementSelector).cloneNode(true);
  const imageElement = placeNew.querySelector(optionsCard.imageSelector);
  const counterLikes = placeNew.querySelector(optionsCard.counterSelector);
  const deleteButton = placeNew.querySelector(optionsCard.deleteSelector);

  placeNew._id = placeId;

  placeNew.querySelector(optionsCard.textSelector).textContent = nameItemPlace;
  if (countLikes>0) {
    counterLikes.textContent = ''+countLikes;
  } else {
    counterLikes.textContent = '';
  }

  if (userId !== ownerId) {
    deleteButton.classList.add('element__delete_hidden');
  } else {
    deleteButton.classList.remove('element__delete_hidden');
  }

  imageElement.alt = nameItemPlace;
  imageElement.src = linkItemPlace;
  imageElement.addEventListener('click', function(evt){
    previewComment.textContent = evt.target.closest(optionsCard.elementSelector).querySelector(optionsCard.textSelector).textContent;
    previewImage.alt = evt.target.alt;
    previewImage.src = evt.target.src;

    openPopup(previewPopup);
  });

  placeNew.querySelector(optionsCard.likeSelector).addEventListener('click', function(evt) {
    if(!evt.target.classList.contains(optionsCard.activeLikeClass)) {
      likeCard(evt.target.closest(optionsCard.elementSelector)._id)
        .then(result => {
          evt.target.closest(optionsCard.elementSelector).querySelector(optionsCard.counterSelector).textContent = ''+result.likes.length;
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      unlikeCard(evt.target.closest(optionsCard.elementSelector)._id)
        .then(result => {
          if (result.likes.length>0) {
            evt.target.closest(optionsCard.elementSelector).querySelector(optionsCard.counterSelector).textContent = ''+result.likes.length;
          } else {
            evt.target.closest(optionsCard.elementSelector).querySelector(optionsCard.counterSelector).textContent = '';
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    evt.target.classList.toggle(optionsCard.activeLikeClass);
  });

  deleteButton.addEventListener('click', function(evt) {
    deleteCard(evt.target.closest(optionsCard.elementSelector)._id)
      .then(result => {
        evt.target.closest(optionsCard.elementSelector).remove();
      })
      .catch(err => {
        console.log(err);
      })
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
