# iSocial

## Context
iSocial is a modern social network offering a comprehensive range of features expected from a social platform. The application allows users to create content, interact with other users, and manage their profiles. It also includes moderation and administration tools for efficient platform management.

## Features
The iSocial project provides the following features:

### User Management
- **User Creation and Authentication**: Secure registration and login for users.
- **Role System**: Three types of roles are defined—User, Moderator, and Admin.
  - **Moderators and Admins**: Can delete any post within the app.
  - **Admin**: Has access to a user management section where they can search for and delete users.

### Posts
- **Post Creation**: Users can create posts containing:
  - Text
  - Emojis
  - Profile Picture
  - Image
- **Post Interactions**:
  - Like and comment system for each post.
  - Main page to view all posts within the app.

### User Profile
- **User Profile Page**: Each user has a personal page displaying:
  - Profile Banner
  - Personal Information (name, email, profile picture)
  - List of the user’s posts
- **Profile Management**:
  - Option to change the profile picture.
  - Option to delete their own posts.

### Navigation
- **Profile Access**: Users can access their own profile via a dedicated tab. They can also view other users' profiles by clicking on their profile picture in their posts.

## Technologies
The development of iSocial relies on the following technologies:

- **Frontend**:  
  Developed in JavaScript with the React framework (version 18.2.0).
  
- **Backend**:  
  Developed in Node.js with the Express.js framework (version 4.18.2).
  
- **Database**:  
  MySQL is used as the relational database management system.  
  The Sequelize ORM is used to facilitate interactions with the database, particularly for CRUD operations (Create, Read, Update, Delete).
