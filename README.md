# Blog CMS

A simple blog with CMS made with React, Express and MongoDb.

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

