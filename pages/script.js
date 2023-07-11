import { enableValidation } from "../src/components/validate.js";
import { enableModal } from "../src/components/modal.js";
import { enableCard } from "../src/components/card.js";

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

  enableModal(
    {
      itemSelector: '.popup__form-item',
      buttonSelector: '.popup__form-button-save',
      popupSelector: '.popup',
      openedFormClass: 'popup_opened',
    }
  );

  enableCard();
