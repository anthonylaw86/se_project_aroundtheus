import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open({ name, link }) {
    this._popupElement.querySelector(".modal__image-title").textContent = name;
    const image = this._popupElement.querySelector(".modal__image");
    image.src = link;
    image.alt = ${name};
    super.open();
  }
}

export default PopupWithImage;