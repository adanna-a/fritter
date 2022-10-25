// POST /api/followees
function followUser(fields) {
  fetch('api/followees', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

// DELETE /api/followees/:id
function unfollowUser(fields) {
  fetch(`/api/followees/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

// DELETE /api/followees?feedName=NAME
function deleteFeed(fields) {
  fetch(`/api/followees?feedName=${fields.feedName}`)
    .then(showResponse)
    .catch(showResponse);
}

// GET /api/followees?feedName=NAME
function viewFeed(fields) {
  fetch(`/api/followees?feedName=${fields.feedName}`)
    .then(showResponse)
    .catch(showResponse);
}

// // GET /api/feeds?author=USERNAME
// function viewAllFolloweesByAuthor(fields) {
//   fetch(`/api/followees?=${fields.author}`)   
//     .then(showResponse)
//     .catch(showResponse);
// }