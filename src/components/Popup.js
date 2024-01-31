export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._closePopupOutside);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._closePopupOutside);
  }

  _handleEscClose(e) {
    e.preventDefault();

    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    closeButtons.forEach((button) => {
      const popup = button.closest(".modal");
      button.addEventListener("click", () => this.close(popup));
    });
    closePopupOutside.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        this.close(e.currentTarget);
      }
    });
  }
}
