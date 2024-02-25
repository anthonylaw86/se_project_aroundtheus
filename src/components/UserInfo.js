class UserInfo {
  constructor({
    profileTitleSelector,
    profileDescriptionSelector,
    avatarSelector,
  }) {
    this._title = document.querySelector(profileTitleSelector);
    this._description = document.querySelector(profileDescriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
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

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

  getAvatar(avatar) {
    return {
      avatar: this._avatar.src,
    };
  }
}

export default UserInfo;
