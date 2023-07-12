class Api {
  constructor({ baseUrl, headers }) {
    this.Url = baseUrl;
    this.headers = headers;
    this.authorization = headers.authorization;
    this.contentType = headers["Content-Type"];
    this.profileURL = `${baseUrl}/users/me`;
    this.imageUrl = `${this.Url}/cards`;
  }

_checkResponse(res){
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

  getInitialProfileData(data) {
    return fetch(this.profileURL, {
      method: "GET",
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${data}`}
    }).then(this._checkResponse);
  }

  getInitialImages(data) {
    return fetch(this.imageUrl, {
      method: "GET",
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${data}`}
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(this.profileURL, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addNewImage({ name, link }) {
    return fetch(this.imageUrl, {
      method: "POST",
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteImage(cardID) {
    return fetch(`${this.imageUrl}/${cardID}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`},
    }).then(this._checkResponse);
  }

  placeLike(cardID) {
    return fetch(`${this.imageUrl}/${cardID}/likes`, {
      method: "PUT",
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`},
    }).then(this._checkResponse);
  }

  removeLike(cardID) {
    console.log(cardID);
    return fetch(`${this.imageUrl}/${cardID}/likes`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`},
    }).then(this._checkResponse);
  }

  updateAvatar(link) {
    return fetch(`${this.profileURL}/avatar`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",
      "Authorization" : `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }

 changeLikeCardStatus(cardId, isLiked){
  if(isLiked){return this.placeLike(cardId)} else{ return this.removeLike(cardId)}
 }

register(data){
  return fetch(`${this.Url}/signup`, {
    method: "POST",
    headers: this.headers,
    body: JSON.stringify(data)
  }).then(this._checkResponse);
}

authorize(data){
  return fetch(`${this.Url}/signin`, {
    method: "POST",
    headers: this.headers,
    body: JSON.stringify(data)
  }).then(this._checkResponse);
}

authorizationCheck(data){
  return fetch(`${this.Url}/users/me`, {
    method: "GET",
    headers: {"Content-Type": "application/json",
              "Authorization" : `Bearer ${data}`}
  }).then(this._checkResponse);
}
}

const api = new Api({ baseUrl: "https://api.mestovova.nomoredomains.work",
headers: {
  "Content-Type": "application/json",
},});


const authApi = new Api({baseUrl: "https://api.mestovova.nomoredomains.work", 
headers: {
  "Content-Type": "application/json" }})



export  {api, authApi};