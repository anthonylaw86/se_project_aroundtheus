import Popup from "./Popup.js";

class UserInfo extends Popup {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileNameElement = profileNameSelector;
    this._profileDescriptionElement = profileDescriptionSelector;
  }
  getUserInfo() {
    return {
      userProfileName: this._profileNameElement.textContent,
      userProfilDescription: this._profileDescriptionElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    (this._profileNameElement.textContent = userProfileName),
      (this._profileDescriptionElement.textContent = userProfilDescription);
  }
}
