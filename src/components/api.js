const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: 'c8502558-7bd8-4793-be9b-945d08eb74d9',
    'Content-Type': 'application/json'
  }
};

// lqkejg

function _getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => _getResponseData(res));
}

export const setUserInfo = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userData)
  })
  .then(res => _getResponseData(res));
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => _getResponseData(res));
}

export const addCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData)
  })
  .then(res => _getResponseData(res));
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => _getResponseData(res));
}

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => _getResponseData(res));
}

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => _getResponseData(res));
}

export const setUserAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(res => _getResponseData(res));
}
