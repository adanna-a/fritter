/* eslint-disable @typescript-eslint/restrict-template-expressions */

function followUser(fields) {
  fetch('api/followees', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
  fetch(`/api/followees/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function deleteFeed(fields) {
  fetch(`/api/followees?feedName=${fields.id}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewFeed(fields) {
  fetch(`/api/followees?feedName=${fields.feedName}`)
    .then(showResponse)
    .catch(showResponse);
}