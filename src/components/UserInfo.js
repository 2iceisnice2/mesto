
export default class UserInfo {
  constructor({ userName, userAbout, userAvatar }) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
      userAvatar: this._userAvatar.src
    }
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
    this._userAvatar.src = userData.avatar
  }
}