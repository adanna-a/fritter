/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

// `POST /api/likes`
function likeFreet(fields) {
    fetch('/api/likes', {method: 'POST', body: JSON.stringify(fields),  headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
}

// `DELETE /api/likes/:id`
function unlikeFreet(fields) {
  fetch(`/api/likes/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

// `GET /api/likes?author=USERNAME`
function viewLikesByAuthor(fields) {
  fetch(`/api/likes?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

// `GET /api/likes?freetId=FREET`
function viewLikesByFreet(fields) {
  fetch(`/api/likes?freetId=${fields.freet}`)
    .then(showResponse)
    .catch(showResponse)
}

// `GET /api/likes?freetId=FREET&rank=true`
function viewFreetRank(fields) {
  fetch(`/api/likes?freetId=${fields.freet}`)
    .then(showResponse)
    .catch(showResponse);
}
