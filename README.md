# Fritter API Routes

## App
#### `GET /`

This renders the `index.html` file that will be used to interact with the backend

## Freets
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

#### `GET /api/freets?country=COUNTRY` - Get freets by topic

**Returns**

- An array of freets associated with a country `country`

**Throws**

#### `POST /api/freets` - Create a new freet

**Body**

- `content` _{string}_ - The content of the freet

**Returns**

- A success message
- A object with the created freet

**Throws**

- `403` if the user is not logged in
- `400` If the freet content is empty or a stream of empty spaces
- `413` If the freet content is more than 140 characters long

#### `DELETE /api/freets/:freetId?` - Delete an existing freet

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the author of the freet
- `404` if the freetId is invalid

#### `PUT /api/freets/:freetId?` - Update an existing freet

**Body**

- `content` _{string}_ - The new content of the freet

**Returns**

- A success message
- An object with the updated freet

**Throws**

- `403` if the user is not logged in
- `404` if the freetId is invalid
- `403` if the user is not the author of the freet
- `400` if the new freet content is empty or a stream of empty spaces
- `413` if the new freet content is more than 140 characters long

## Users
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
- An object with the created user's details (without password)

**Throws**

- `403` if there is a user already logged in
- `400` if username or password is in the wrong format
- `409` if username is already in use

#### `PUT /api/users` - Update a user's profile

**Body** _(no need to add fields that are not being changed)_

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

## Trends
#### `GET /api/trends?country=COUNTRY` - Get country's trending freets

**Returns**

- An array of top trending freets associated with the country `country`

**Throws**
- `400` if `country` is not given
- `404` if `country` is not a recognized or supported country of Fritter

#### `POST /api/trends/` - Create a new country trend

**Body**

- `country` _{string}_ - The country that has the specific trends
- `trend` _{Item}_ - The trending item

**Returns**

- A success message
- A object with the created trend

**Throws**

- `403` if the user is not logged in
- `400` If the country is empty or a stream of empty spaces
- `413` If no item given

#### `PUT /api/trends/:trendId?` - Update an existing trend

**Body**

- `trends` _{Array<Item>}_ - The new list of top trending items

**Returns**

- A success message
- An object with the updated trend

**Throws**

- `403` if the user is not logged in
- `404` if the trendId is invalid
- `400` if the new trend trends is empty

#### `DELETE /api/trends/:trendId` - Delete trends for a country

**Returns**

- A success message

**Throws**
- `404` if the trendId is invalid

## Feeds
#### `GET /api/feeds?author=USERNAME` - Get feeds by author

**Returns**

- An array of feeds created by user with username `author`

**Throws**

- `400` if `author` is not given
- `404` if `author` is not a recognized username of any user


#### `POST /api/feeds` - Create a new feed

**Body**

- `name` _{string}_ - The name of the feed
- `followees` _Array<string>_ - Array of accounts the user follows on this feed

**Returns**

- A success message
- A object with the created feed

**Throws**

- `403` if the user is not logged in
- `400` If the feed name is empty or a stream of empty spaces
- `400` If the feed name is empty or a stream of empty spaces
- `400` If the feed followees is empty
- `413` If the feed content is more than 30 characters long

#### `DELETE /api/feeds/:feedId?` - Delete an existing feed

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the author of the feed
- `404` if the feedId is invalid

## Likes
#### `GET /api/likes?author=USERNAME` - Get likes made by author

**Returns**

- An array of likes made by user with username `author`

**Throws**

- `400` if `author` is not given
- `404` if `author` is not a recognized username of any user



#### `GET /api/likes?freetId=FREET` - Get likes associated with freet
- An array of likes made towards freet with freet id `freetId`

**Throws**

- `400` if `freetId` is not given
- `404` if the freetId is invalid

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

#### `DELETE /api/likes/:likeId` - Unlike a freet
**Returns**

- A success message

**Throws**

- `403` if the user is not logged in
- `403` if the user is not the author of the like
- `404` if the likeId is invalid


<!-- User
- username: User -> one Username
- password: User -> one Password
- userId: User -> one UserId

Freet
- author: Freet -> one User
- content: Freet -> one Content
- dateCreated: Freet -> one Date
- dateModified: Freet -> one Date
- id: Freet -> one FreetId
- topic: Freet -> lone Topic
- country: Freet -> lone Country

Like[Item]
- author: Like -> one User
- likedItem: Item -> one Item

Followee
- follower: Followee -> one User
- followee: Followee -> one User
- feedName: Followee -> one String

Comment[Item]
- author: Comment -> one User
- content: Item -> one Content
- 
App Definition
app Fritter
concepts
User
Freet 
Like[Freet.Freet]
Followee
Comment[Freet.Freet] -->
