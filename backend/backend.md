# API's
  ## Authentication
  ### Register
- **URL**: `/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "fullname": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
    ```json
    {
     "token" : "string"
    }
    ```
### Login
- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
    ```json
    {
     "token" : "string"
    }
    ```

### Logined User Profile
- **URL**: `/profile`
- **Method**: `GET`
- **Request Body**: Get user Id from token `{ req.user.userId}`
- **Response**:
    ```json
    {
     "username" : "string",
    "fullname" : "string",
    "email" : "string",
    "posts" : [
      {
       "id" : "string",
       "user_id" : "string",
       "caption" : "string" ,
       "media" : [
           {
            "id" : "string" ,
            "type" : "string" ,
            "url" : "string"
          } ],
       "comments" : [
           {
           "id" : "string" ,
           "comment" : "string" ,
           "comment_user_id"  : "string" ,
           "post_id" : "string" ,
           "user" : "join table user the name comment_user_id"
          } ] ,
       "likes" : [
        {
         "id" : "string" ,
         "liked_user_id" : "string" ,
         "post_id" : "string"
        } ],
       "user" : {
          "id" : "string" ,
          "username" : "string"  ,
         "fullname" : "string"  ,
         "email" : "string"  ,
         "profilePhoto" : "string"
       } ,
       "totalLikes":"number" ,
       "isLikedByUser" : "boolean" 
      }
    ]
     }
    ```

### user Edit
- **URL**: `/user-edit`
- **Method**: `PATCH`
- **Request Body**: Get user Id from token `{ req.user.userId}`
- **Response** : same response as profile

### Get User by username
- **URL**: `/user/:username`
- **Method**: `GET`
- **Request Body**: query.params.username
- **Response** : same response as profile

### Search User
- **URL**: `/search?user=string`
- **Method**: `GET`
- **Request Body**: Search User
- **Response** :
   ```json
      "users" : [
         {
           "id" : "string",
           "fullname" : "string" ,
           "username" : "string",
           "email" : "string",
           "firstname" : " string" ,
           "lastname" : "string"
         }
      ]
  ```
## POST
### Feed
- **URL**: `/feeds`
- **Method**: `GET`
- **Request Body**: Get user Id from token `{ req.user.userId}`
- **Response** : same response as profile.posts[]

### Create Post
- **URL**: `/post`
- **Method**: `POST`
- **Request Body**:
   ```json
      {
      "userId": "string",
      "caption": "string"
      }

   ```
- **Response** :
    ```json
      {
       "id" : "string",
       "user_id" : "string",
       "caption" : "string" ,
       "media" : [
           {
            "id" : "string" ,
            "type" : "string" ,
            "url" : "string"
          } ],
       "comments" : [
           {
           "id" : "string" ,
           "comment" : "string" ,
           "comment_user_id"  : "string" ,
           "post_id" : "string" ,
           "user" : "join table user the name comment_user_id"
          } ] ,
       "likes" : [
        {
         "id" : "string" ,
         "liked_user_id" : "string" ,
         "post_id" : "string"
        } ],
       "user" : {
          "id" : "string" ,
          "username" : "string"  ,
         "fullname" : "string"  ,
         "email" : "string"  ,
         "profilePhoto" : "string"
       } ,
       "totalLikes":"number" ,
       "isLikedByUser" : "boolean" 
      }
      
   ```
### Delete Post
- **URL**: `/post/:id`
- **Method**: `DELETE`
- **Request Body**:
   ```json
     {
      "userId": "string",
      "postId": "string"
     }

   ```
- **Response** :
   ```json
     {
      "message": "string"
      }

  ```
## Comment
### Add Comment
- **URL**: `/comment`
- **Method**: `POST`
- **Request Body**:
   ```json
     {
     "userId": "string",
     "comment": "string"
    }

   ```
- **Response** :
   ```json
         {
           "id" : "string" ,
           "comment" : "string" ,
           "comment_user_id"  : "string" ,
           "post_id" : "string" ,
           "user" : "join table user the name comment_user_id"
          } 
  ```

### DELETE Comment
- **URL**: `/comment/:id`
- **Method**: `DELETE`
- **Request Body**:
  ```json
     {
     "commentId": "string"
    }

  ```
- **Response** :
   ```json
      {
      "message": "string"
      }

  ```

## Like
### Like Post
- **URL**: `/like`
- **Method**: `POST`
- **Request Body**:
  ```json
     {
     "userId": "string",
     "postId": "string"
     }


  ```
- **Response** :
   ```json
      {
      "message": "string"
      }


  ```
  


