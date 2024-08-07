
# Instagram Clone


## Description
This project is a clone of Instagram, designed to replicate its core functionalities and user interface

## Demo creditation to see
   - email (demo@gmail.com)
   - password (demo)

### Features
  - sign up / login
  - upload/delete post
  - upload/delete comment
  - like the posts
  - user profile management
  - search for users

## High-level Design
<img width="594" alt="Screenshot 2024-08-07 at 1 45 32 PM" src="https://github.com/user-attachments/assets/d0ca4f99-4b12-4d2d-a42e-e929933bd12a">



## Data Model
<img width="1000" alt="Screenshot 2024-08-07 at 1 58 19 PM" src="https://github.com/user-attachments/assets/4db5d211-ab20-44ed-be8b-be0ec8477f46">

   
## API's 
[BACKEND API's](https://github.com/shilpashingnapure/instagram_clone/blob/main/backend/backend.md)




## Low-Level Design
- Use Case Diagram

![Screenshot 2024-08-07 at 1 39 21 PM (2)](https://github.com/user-attachments/assets/3bd86a65-5615-43db-87a4-9dac8e80eb3b)

- Class Diagram

<img width="1000" alt="Screenshot 2024-08-07 at 2 32 08 PM" src="https://github.com/user-attachments/assets/4f7b33ba-ff84-422a-9972-4ef6d1357076">




### Future goal
  - follow/unfollow others users
  - stories and reels uploading
  - show feed based following users
  - upload vidoes/multiple posts

## Tech Stack
- Backend : Node.js, TypeScript, Express, TypeOrm , PostgreSQL
- Frontend : React, Tailwind CSS, Redux


## How to Run the Project locally

#### Step 1: Clone the Repository

```sh
   git clone  https://github.com/shilpashingnapure/instagram_clone.git
```

#### Step 2 : Navigate to Project Directory

```sh
  cd instagram_clone
```

#### Step 3 : Run Project locally 
 - Backend
    - Install Dependencies
      
      ```
        cd backend
        npm install
       ```
    - Set Up Database
        - if you don't have postgreSQL installed, use the 'docker-compose' file.
        - Add databse credentials to 'docler-compose.yml'
        - run the docker container:
          
           ```
            docker-compose up -d
           ```
    - Run backend
        - Start the development server
          ```
           npm run dev
          ```
       - or build and start the production server
         ```
           npm run build
           npm start
         ```

- Frontend
    - Install Dependencies
       ```
         cd frontend
         npm install
       ```
   - Run frontend
     ```
      npm start
     ```
  - To run this project, you will need to set up Cloudinary for image uploads. Follow these steps:
     1. Sign up for a Cloudinary account.
     2. Get your Cloudinary API credentials (Cloud name, API key, and API secret).
     3. Create a `.env` file in the root of your project and add the following:
        ```env
           REACT_APP_COLUDINARY_URL= 'https://api.cloudinary.com/v1_1/${USER_CLOUND_NAME}/image/upload'
           REACT_APP_COLUDINARY_UPLOAD_PRESET_POST=your preset name
        ```


