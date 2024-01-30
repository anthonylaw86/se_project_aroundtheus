import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupForm.querySelector("add-card-modal");
    this._handleFormSubmit = handleFormSubmit;
    super.open();
  }

  _getInputValues() {
    const inputEls = Array.from(this._popupform.querySelector(".modal__form"));
    const inputValues = {};
    inputEls.forEach((inputEl) => {
      inputValues[inputEl.title] = input.value;
      inputValues[inputEl.url] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      e.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(values);
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
