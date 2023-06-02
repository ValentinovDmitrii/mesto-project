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

const formElement = document.querySelector('.popup');
const infoEditButton = document.querySelector('.profile__info-edit-button');
const popupButtonClose = document.querySelector('.popup__button-close');
const nameInput = document.querySelector('.popup__form-item_input_name');
const jobInput = document.querySelector('.popup__form-item_input_description');

const profileInfoNameText = document.querySelector('.profile__info-name-text');
const profileInfoDescription = document.querySelector('.profile__info-description');
const infoAddButton = document.querySelector('.profile__add-button');

const formItem = document.querySelector('.new-item-popup');
const popupNewItemButtonClose = document.querySelector('.new-item-popup__button-close');
const namePlace = document.querySelector('.new-item-popup__form-item_input_name');
const linkPlace = document.querySelector('.new-item-popup__form-item_input_link');
const placesElements = document.querySelector('.places__elements');

const preview = document.querySelector('.preview');
const previewCloseButton = document.querySelector('.preview__button-close');

function setPopupOpened() {
  nameInput.value = profileInfoNameText.textContent;
  jobInput.value = profileInfoDescription.textContent;
  formElement.classList.add('popup_opened');
}

function setPopupClosed() {
  formElement.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileInfoNameText.textContent = nameInput.value;
  profileInfoDescription.textContent = jobInput.value;
  setPopupClosed();
}

function setNewItemPopupOpened() {
  namePlace.value = '';
  linkPlace.value = '';
  formItem.classList.add('new-item-popup_opened');
}

function setNewItemPopupClosed() {
  formItem.classList.remove('new-item-popup_opened');
}

function setPlaceElement(nameItemPlace, linkItemPlace) {
  const placeTemplate = document.querySelector('#place-element').content;
  const placeNew = placeTemplate.querySelector('.element-item').cloneNode(true);
  const imageElement = placeNew.querySelector('.element__image');

  placeNew.querySelector('.element__text').textContent = nameItemPlace;
  imageElement.src = linkItemPlace;
  imageElement.alt = nameItemPlace;
  imageElement.addEventListener('click', function(evt){
    preview.querySelector('.preview__image').src = evt.target.src;
    preview.querySelector('.preview__caption').textContent = evt.target.parentElement.querySelector('.element__text').textContent;
    preview.classList.add('preview_opened');
  });

  placeNew.querySelector('.element__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
  placeNew.querySelector('.element__delete').addEventListener('click', function(evt) {
    evt.target.parentElement.parentElement.remove();
  });

  return placeNew;
}

function prependNewPlace(newItem) {
  placesElements.prepend(newItem);
}

function handleNewItemFormSubmit(evt) {
  evt.preventDefault();
  prependNewPlace(setPlaceElement(namePlace.value, linkPlace.value));
  setNewItemPopupClosed();
}

function setPreviewClosed() {
  preview.classList.remove('preview_opened');
}

for (i=0; i<initialCards.length; i++) {
  prependNewPlace(setPlaceElement(initialCards[i].name, initialCards[i].link));
}

infoEditButton.addEventListener('click', setPopupOpened);
infoAddButton.addEventListener('click', setNewItemPopupOpened);
popupButtonClose.addEventListener('click', setPopupClosed);
formElement.addEventListener('submit', handleFormSubmit);

popupNewItemButtonClose.addEventListener('click', setNewItemPopupClosed);
formItem.addEventListener('submit', handleNewItemFormSubmit);

previewCloseButton.addEventListener('click', setPreviewClosed);

