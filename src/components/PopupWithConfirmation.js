import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor({ handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const values = this._getInputValues();
      this._handleFormSubmit(values);
    });
  }
}

export default PopupWithConfirmation;
