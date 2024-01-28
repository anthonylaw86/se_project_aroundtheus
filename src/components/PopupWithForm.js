import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._popupForm.querySelector(".modal__input_type_title").textContent = name;
    const form = this._popupElement.querySelector(".modal__form");
    form.src = link;
    form.alt = ${name};
    super.open();
  }

  setEventListeners() {}

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm
