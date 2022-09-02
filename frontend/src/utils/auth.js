class Auth {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  registration(password, email) {
    return fetch(this._baseUrl + `/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
    .then(this._checkResponse);
  }

  authorization(password, email) {
    return fetch(this._baseUrl + `/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then(this._checkResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token)
          return data.token
        }
      })
  }

  getContent() {
    return fetch(this._baseUrl + `/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
    .then(this._checkResponse);
  }
}

const auth = new Auth({
  baseUrl: "https://mesto.back.nomorepartiesxyz.ru",
  headers: { 
    "Content-Type": "application/json",
    'Accept': 'application/json',
  },
});

export default auth;
