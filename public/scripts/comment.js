/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createComment(fields) {
  fetch('/api/comments', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showRepsonse);
}

function deleteComment(fields) {
  fetch(`/api/comments/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function viewCommentsByAuthor(fields) {
  fetch(`/api/comments?author=${fields.author}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewCommentsByFreet(fields) {
  fetch(`/api/comments?freetId=${fields.freetId}`)
    .then(showResponse)
    .then(showResponse);
}