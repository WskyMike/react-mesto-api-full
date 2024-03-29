class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers
    this._baseUrl = baseUrl
  }
  _checkResponse (res) {
    if (res.ok ) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка ${res.status}`)
    }
  }
  // Получить данные ПРОФИЛЬ
  getProfile() {
    return fetch(this._baseUrl+`/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
    .then(this._checkResponse)
  }
  // Получить данные ФОТО
  getInitialCards() {
    return fetch(this._baseUrl+`/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
    .then(this._checkResponse)
  }
  // Редактировать данные ПРОФИЛЬ
  editProfile(name, about) {
    return fetch(this._baseUrl+`/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)
  }
  // Добавить карточку ФОТО
  addCard(name, link) {
    return fetch(this._baseUrl+`/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse)
  }
  // Удалить карточку
  deleteCard(id) {
    return fetch(this._baseUrl+`/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
    .then(this._checkResponse)
  }

  // Поставить\удалить лайк
  changeLikeCardStatus(id, isLiked) {
    return fetch(this._baseUrl+`/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
    .then(this._checkResponse)
  }
  // Обновить АВАТАР
  updateAvatar(avatar) {
    return fetch(this._baseUrl+`/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
      avatar
      })
    })
    .then(this._checkResponse)
  }
};

const api = new Api({
  baseUrl: 'https://backend.mesto.webtm.ru',
});

export default api;