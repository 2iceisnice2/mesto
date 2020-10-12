export default class Api {
    constructor(options) {
      // тело конструктора
    }
  

getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
}

getUserInfo() {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me', {
    headers: {
      authorization: 'c157bcdf-cc24-47fa-ae84-1faa074ac4ef'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}
  
getInitialCards() {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-16/cards', {
    headers: {
      authorization: 'c157bcdf-cc24-47fa-ae84-1faa074ac4ef'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}
  

setUserInfo({name, about}) {
  return   fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me', {
    method: 'PATCH',
      headers: {
        authorization: 'c157bcdf-cc24-47fa-ae84-1faa074ac4ef',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name,
          about
        })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

addNewCard({ name, link }) {
  return fetch('https://mesto.nomoreparties.co/v1/cohort-16/cards', {
    method: 'POST',
      headers: {
        authorization: 'c157bcdf-cc24-47fa-ae84-1faa074ac4ef',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name,
          link
        })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


removeCard(cardID) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-16/cards/${cardID}`, {
    method: 'DELETE',
      headers: {
        authorization: 'c157bcdf-cc24-47fa-ae84-1faa074ac4ef',
      }
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } 
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
      .catch((err) => {
            console.log(err);
      })
}


setUserAvatar({ avatar }) {    
  return fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me/avatar', {
    method: 'PATCH',
      headers: {
        authorization: 'c157bcdf-cc24-47fa-ae84-1faa074ac4ef',    
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          avatar
        })
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } 
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
      .catch((err) => {
        console.log(err);
      })
}



putLike(cardID) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-16/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: {
      authorization: 'c157bcdf-cc24-47fa-ae84-1faa074ac4ef',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } 
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
      .catch((err) => {
        console.log(err);
      })
}



removeLike(cardID) {
  return fetch(`https://mesto.nomoreparties.co/v1/cohort-16/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: 'c157bcdf-cc24-47fa-ae84-1faa074ac4ef',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } 
        else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
    })
      .catch((err) => {
        console.log(err);
      })
}   
}