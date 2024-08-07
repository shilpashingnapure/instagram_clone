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
