import Popup from "./Popup.js";

class UserInfo extends Popup {
  constructor({ profileTitleSelector, profileDescriptionSelector }) {
    this._profileTitleElement = profileTitleSelector;
    this._profileDescriptionElement = profileDescriptionSelector;
  }
  getUserInfo() {
    return {
      userProfileTitle: this._profileTitleElement.textContent,
      userProfilDescription: this._profileDescriptionElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    (this._profileTitleElement.textContent = userProfileName),
      (this._profileDescriptionElement.textContent = userProfilDescription);
  }
}

export default UserInfo;
