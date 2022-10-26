## Fritter - RESTful API Routes

### 0. App

#### `GET /`
This renders the `index.html` file that will be used to interact with the backend

### 1. Freets

#### `GET /api/freets` - Get all the freets
**Returns**
- An array of all freets sorted in descending order by date modified

#### `GET /api/freets?author=USERNAME` - Get freets by author
**Returns**
- An array of freets created by user with username `author`

**Throws**
- `400` if `author` is not given
- `404` if `author` is not a recognized username of any user

#### `GET /api/freets?topic=TOPIC` - Get freets by topic
**Returns**
- An array of freets associated with a topic `topic`

**Throws**
- `400` if `topic` is not given
- `406` if `topic` is not currently available on Fritter

#### `GET /api/freets?country=COUNTRY` - Get freets by country
**Returns**
- An array of freets associated with a country `country`

**Throws**
- `400` if `country` is not given
- `406` if `country` is not currently supported by Fritter

#### `POST /api/freets` - Create a new freet
**Body**
- `content` _{string}_ - The content of the freet
- `topic` _{string}_ - The topic of the freet
- `country` _{string}_ - The country associated with the freet

**Returns**
- A success message
- A object with the created free

**Throws**
- `403` if the user is not logged in
- `400` If the freet content is empty or a stream of empty spaces
- `400` If the freet topic is empty or a stream of empty spaces
- `400` If the freet country is empty or a stream of empty spaces
- `413` If the freet content is more than 140 characters long
- `406` if the topic is not currently available on Fritter
- `406` if the country is not currently supported by Fritter

#### `DELETE /api/freets/:freetId?` - Delete an existing freet
**Returns**
- A success message

**Throws**
- `403` if the user is not logged in
- `403` if the user is not the author of the freet
- `404` if the freetId is invalid

#### `PUT /api/freets/:freetId?` - Update an existing freet
**Body**
- `content` _{string}_ - The content of the freet
- `topic` _{string}_ - The topic of the freet
- `country` _{string}_ - The country associated with the freet
**Returns**
- A success message
- An object with the updated freet

**Throws**
- `403` if the user is not logged in
- `404` if the freetId is invalid
- `403` if the user is not the author of the freet
- `400` if the new freet content is empty or a stream of empty spaces
- `400` If the new freet topic is empty or a stream of empty spaces
- `400` If the new freet country is empty or a stream of empty spaces
- `413` if the new freet content is more than 140 characters long
- `406` If the new freet topic is not currently available on Fritter
- `406` if the new freet country is not currently supported by Fritter

### 2. Users

#### `POST /api/users/session` - Sign in user
**Body**
- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password
**Returns**
- A success message
- An object with user's details (without password)

**Throws**
- `403` if the user is already logged in
- `400` if username or password is not in correct format format or missing in the req
- `401` if the user login credentials are invalid

#### `DELETE /api/users/session` - Sign out user
**Returns**
- A success message

**Throws**
- `403` if user is not logged in

#### `POST /api/users` - Create an new user account
**Body**
- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password
**Returns**
- A success message
- An object with the update user details (without password)

**Throws**
- `403` if the user is not logged in
- `400` if username or password is in the wrong format
- `409` if the username is already in use

#### `DELETE /api/users` - Delete user
**Returns**
- A success message

**Throws**
- `403` if the user is not logged in

### 3. Followees

#### `POST /api/followees` - Follow a user
**Body**
- `username` _{string}_ - The followed user's username
- `feedName` _{string}_ - The name of the feed that the user is following the other user on
**Returns**
- A success message
- An object with followee's details 

**Throws**
- `401` if the user login credentials are invalid
- `400` if the feedName is empty or a stream of empty spaces
- `413` if the new freet content is more than 50 characters long


#### `DELETE /api/followees/:followeeId?` - Delete an existing followee
**Returns**
- A success message

**Throws**
- `403` if the user is not logged in
- `404` if the followeeId is invalid

#### `DELETE /api/followees?feedName=NAME` - Delete a user's feed wuth name `feedName`
**Returns**
- A success message

**Throws**
- `404` If the user has no feed with name `feedName`

#### `GET /api/followees?feedName=NAME` - Get followees on a user's feed
**Returns**
- An array of users that the signed in user follows on their feed `feedName`

**Throws**
- `404` if `feedName` is not given
- `404` if user does not have a feedName called `feedName`

### 4. Likes

#### `POST /api/likes` - Like a freet
**Body**
- `freetId` _{string}_ - The id of the freet being liked
**Returns**
- A success message
- A object with the created like

**Throws**
- `403` if the user is not logged in
- `400` if `freetId` is not given
- `404` if the freetId is invalid

#### `DELETE /api/likes/:likeId`
**Returns**
- A success message

**Throws**
- `403` if the user is not logged in
- `403` if the user is not the author of the like
- `404` if the likeId is invalid

#### `GET /api/likes?author=USERNAME`
**Returns**
- An array of likes made by user with username `author`

**Throws**
- `400` if `author` is not given
- `404` if `author` is not a recognized username of any user

#### `GET /api/likes?freetId=FREET`
**Returns**
- An array of likes made towards freet with freet id `freetId`

**Throws**
- `400` if `freetId` is not given
- `404` if the freetId is invalid

### 5. Comments

#### `POST /api/comments` - Create a new comment
**Body**
- `content` _{string}_ - The content of the comment
- `freetId` _{string}_ - The id of the freet being commented on

**Returns**
- A success message
- A object with the created comment

**Throws**
- `403` if the user is not logged in
- `400` If the comment content is empty or a stream of empty spaces
- `413` If the comment content is more than 140 characters long
- `400` if `freetId` is not given
- `404` if the freetId is invalid

#### `DELETE /api/comments/:commentId` - Delete a comment
**Returns**
- A success message

**Throws**
- `403` if the user is not logged in
- `403` if the user is not the author of the comment
- `404` if the commentId is invalid

#### `GET /api/comments?author=USERNAME` - Get comments by user
**Returns**
- An array of comments made by user with username `author`

**Throws**
- `400` if `author` is not given
- `404` if `author` is not a recognized username of any user

#### `GET /api/likes?freetId=FREET` - Get comments on a freet
**Returns**
- An array of comments made towards freet with freetId `freetId`

**Throws**
- `400` if `freetId` is not given
- `404` if the freetId is invalid