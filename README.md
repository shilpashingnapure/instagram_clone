
# Instagram Clone


## Description
This project is a clone of Instagram, designed to replicate its core functionalities and user interface
### Features
  - sign up / login
  - upload/delete post
  - upload/delete comment
  - like the posts
  - user profile management
  - search for users

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

