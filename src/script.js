import { enableValidation } from "./components/validate.js";
import { enableModal } from "./components/modal.js";
import { enableCard } from "./components/card.js";

import './index.css';

enableValidation(
  { pageSelector: '.page',
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__form-button-save',
    linkID: 'place-link',
    linkAvatarID: 'avatar-link',
    inactiveButtonClass: 'popup__form-button-save_disabled',
    inputErrorClass: 'popup__form-item_type-error',
    errorClass: 'popup__form-item-error_active'
  });

enableModal(
  {
    itemSelector: '.popup__form-item',
    buttonSelector: '.popup__form-button-save',
    popupSelector: '.popup',
    openedFormClass: 'popup_opened',
    popupClass: 'popup',
    closeClass: 'popup__button-close',
  }
);

enableCard(
  {
    placeElementID: '#place-element',
    elementSelector: '.element-item',
    imageSelector: '.element__image',
    textSelector: '.element__text',
    elementSelector: '.element',
    likeSelector: '.element__like',
    deleteSelector: '.element__delete',
    activeLikeClass: 'element__like_active',
    itemSelector: '.popup__form-item',
    buttonSelector: '.popup__form-button-save',
   }
);
