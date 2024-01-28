import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputEls = document.querySelector(".modal__form");
    const inputValues = {};
    inputEls.forEach(inputEl);
    {
      inputValues[inputEl.title] = input.value;
      inputValues[inputEl.url] = input.value;
    }
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
