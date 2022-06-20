export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileInfo = document.querySelector(infoSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      about: this._profileInfo.textContent
    };
    return userInfo;
  }

  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = about;
    this._profileAvatar.src = avatar;
  }
}
