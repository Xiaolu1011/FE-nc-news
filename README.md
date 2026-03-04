# NC News Frontend

## Deployed App

https://nc-news-fe-zxl.netlify.app

---

## Project Overview

NC News is a Reddit-style news aggregation application where users can browse, read and interact with articles.

Users can:

- View a list of articles
- Sort articles by date, votes or comment count
- Filter articles by topic
- Read individual articles
- Vote on articles
- View comments
- Post new comments
- Delete their own comments

The project demonstrates full-stack development using a **React frontend** and a **Node / Express / PostgreSQL backend API**.

---

## Backend Repository

https://github.com/Xiaolu1011/backend-nc-news-seeding.git

## Live Backend API:

https://backend-nc-news-seeding.onrender.com/api

---

## Tech Stack

Frontend:

- React
- Vite
- React Router
- Axios

Backend:

- Node.js
- Express
- PostgreSQL

Testing

- Jest
- Supertest

---

## Minimum Node Version

Node.js version required:

```
Node.js v18 or higher
```

Check your version with:

```
node --version
```

---

## Running the Project Locally

### 1. Clone the repository

```
git clone https://github.com/Xiaolu1011/FE-nc-news.git
```

### 2. Navigate into the project

```
cd FE-nc-news
```

### 3. Install dependencies

```
npm install
```

### 4. Create environment file

Create a `.env.development` file:

```
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

Example:

```
VITE_API_URL=https://backend-nc-news-seeding.onrender.com/api
```

### 5. Start the development server

```
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## Features Implemented

- View all articles
- View individual articles
- View comments
- Post comments
- Delete comments
- Vote on articles (optimistic rendering)
- Sort articles
- Filter articles by topic
- Error handling
- Responsive layout

---

## Future Improvements

- Add user authentication
- Improve UI design
- Implement article search

---

## Author

Xiaolu1011

---

## Project Credits

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
