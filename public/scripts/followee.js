
/**
 * // // 'view-feed': viewFeed,

// // POST /api/feeds
// function createFeed(fields) {
//   fetch('api/feeds', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
//     .then(showResponse)
//     .catch(showResponse);
// }

// // PUT /api/feeds/:id?follow=true
// function followUser(fields) {
//   fetch(`api/feeds/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
//     .then(showResponse)
//     .catch(showResponse);  
// }

// // PUT /api/feeds/:id?follow=false
// function unfollowUser(fields) {
//   fetch(`api/feeds/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
//     .then(showResponse)
//     .catch(showResponse);  
// }

// // DELETE /api/feeds/:id
// function deleteFeed(fields) {
//   fetch(`/api/freets/${fields.id}`, {method: 'DELETE'})
//     .then(showResponse)
//     .catch(showResponse);
// }

// // GET /api/feeds?author=USERNAME
// function viewAllFeedsByUser(fields) {
//   fetch(`/api/feeds?author=${fields.author}`)
//     .then(showResponse)
//     .catch(showResponse);
// }

// // GET /api/feeds/:id
// function viewFeed(fields) {
//   fetch(`/api/feeds/${fields.id}`)   
//     .then(showResponse)
//     .catch(showResponse);
// }

// 'view-feed': viewFeed, */

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
function viewAllFolloweesByFeed(fields) {
  fetch(`/api/feeds?author=${fields.feedName}`)
    .then(showResponse)
    .catch(showResponse);
}

// GET /api/feeds?author=USERNAME
function viewAllFolloweesByAuthor(fields) {
  fetch(`/api/followees?=${fields.author}`)   
    .then(showResponse)
    .catch(showResponse);
}