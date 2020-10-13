export default class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }


_handleOriginalResponse(res)  {
  if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
      return res.json();
    }
  

getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
}

getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers
  })
    .then(this._handleOriginalResponse);
}
  
getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers
    
  })
    .then(this._handleOriginalResponse);
}
  

setUserInfo({name, about}) {
  return   fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
      headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
  })
    .then(this._handleOriginalResponse);
}

addNewCard({ name, link }) {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
      headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
  })
    .then(this._handleOriginalResponse);
}


removeCard(cardID) {
  return fetch(`${this._baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
      headers: this._headers,
  })
    .then(this._handleOriginalResponse)
}


setUserAvatar({ avatar }) {    
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
      headers: this._headers, 
        body: JSON.stringify({
          avatar
        })
  })
    .then(this._handleOriginalResponse)
}



putLike(cardID) {
  return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: this._headers
  })
    .then(this._handleOriginalResponse)
}



removeLike(cardID) {
  return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: this._headers
  })
    .then(this._handleOriginalResponse)
}   
}