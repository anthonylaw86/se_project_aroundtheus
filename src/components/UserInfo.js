import Popup from "./Popup.js";

class UserInfo extends Popup {
  constructor(data) {
    this._profileTitle = data.profileTitle;
    this._profileDescription = data.profileDescription;
  }

  _handleProfileSubmit(data) {
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    super.close();
  }
}
