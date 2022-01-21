# Blog CMS

A simple blog with CMS made with React, Express and MongoDb.

Demo here: [https://blog-cms-julien-sebag.herokuapp.com/](https://blog-cms-julien-sebag.herokuapp.com/)

## How to use

Download the project, run `npm install && cd client && npm install`, then create a `.env` file in the root folder with this data:

```
PORT=5005
ORIGIN=http://localhost:3000

MONGODB_URI=mongodb://localhost/blog-cms

EMAIL=your.email@gmail.com
WORD=YourPassword

CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_KEY=your-cloudinary-key
CLOUDINARY_SECRET=your-cloudinary-secret
```

### Seed data

If you want to create fake data, you can use the json files in the `db` folder. Simply import all the files to MongoDb.

## Admin panel

Log in to the admin panel at the address `/dashboard/login`. If you use the fake data provided, you can use these credentials to log in:

email: `admin@email.com`
password: `Password42`

## Features

- Users can sign up and login, but can not access the dashboard before an admin approves them
- User roles: users can either be a writer (who can only add, edit or delete posts), a moderator (writer features, plus delete comments), and admin (writer and moderator features, plus edit global pages and users)
- Add / delete posts
- Add / delete global pages
- Post comments to posts
- Contact form, to the specified address in dashboard 

## Editor

This app uses a markdown editor for the posts. To add React components to use inside, you can add them to the page `/client/pages/posts/PostDetail.js` inside the `const options/overrides`.
