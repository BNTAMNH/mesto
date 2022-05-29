export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent
    };
    return userInfo;
  }

  setUserInfo({ name, info }) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
  }
}
