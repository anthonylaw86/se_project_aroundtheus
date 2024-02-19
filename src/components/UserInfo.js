class UserInfo {
  constructor({ profileTitleSelector, profileDescriptionSelector }) {
    this._title = document.querySelector(profileTitleSelector);
    this._description = document.querySelector(profileDescriptionSelector);
  }
  getUserInfo() {
    return {
      title: this._title.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._title.textContent = title;
    this._description.textContent = description;
  }

  setAvatar(link) {}
}

export default UserInfo;
