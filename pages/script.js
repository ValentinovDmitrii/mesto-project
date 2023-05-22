const formElement = document.querySelector('.popup');
const infoEditButton = document.querySelector('.profile__info-edit-button');
const popupButtonClose = document.querySelector('.popup__button-close');
const nameInput = document.querySelector('.popup__form-item_input_name');
const jobInput = document.querySelector('.popup__form-item_input_description');
const profileInfoNameText = document.querySelector('.profile__info-name-text');
const profileInfoDescription = document.querySelector('.profile__info-description');

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

function setCard (numCard, nameCard, imageCard) {
  let placeElements = document.querySelectorAll('.element');
  if (numCard>=placeElements.length) {
    return;
  } else {
    let placeName = placeElements[numCard].querySelector('.element__text');
    let placeImage = placeElements[numCard].querySelector('.element__image');
    placeName.textContent = nameCard;
    placeImage.setAttribute('src', imageCard);
    return 'OK';
  }
}

for (i=0; i<initialCards.length; i++) {
  setCard(i, initialCards[i].name, initialCards[i].link);
}

infoEditButton.addEventListener('click', setPopupOpened);
popupButtonClose.addEventListener('click', setPopupClosed);
formElement.addEventListener('submit', handleFormSubmit);

