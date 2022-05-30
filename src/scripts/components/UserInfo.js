export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileInfo = document.querySelector(infoSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      info: this._profileInfo.textContent
    };
    return userInfo;
  }
  setUserInfo({ name, info }) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = info;
  }
}
