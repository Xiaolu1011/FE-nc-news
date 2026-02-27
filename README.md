# NC News Frontend

A React frontend application for the NC News API.

This project allows users to browse a list of articles with key metadata including title, author, topic, votes, comment count, publication date, and article image.

---

## Live Backend API

Hosted on Render:

https://backend-nc-news-seeding.onrender.com/api

---

## Tech Stack

- React (Vite)
- React Router
- Axios
- CSS Modules

---

## Features Implemented So Far

- View all articles (`/articles`)
- Article cards display:
  - Title
  - Author
  - Topic
  - Vote count
  - Comment count
  - Publication date
  - Article image
- Basic responsive card layout
- Error handling for failed API requests
- Loading state while fetching data

---

## Running Locally

### 1. Clone the repository

bash
git clone <your-repo-url>
cd nc-news

### 2. Install dependencies

npm install

### 3. Create environment file

Create a file in the root of the project called:
.env.development
Add:
VITE_API_URL=https://backend-nc-news-seeding.onrender.com/api
⚠️ This file is not committed to GitHub.

### 4. Start development server

npm run dev
App will run at:
http://localhost:5173

---

## Folder Structure (Current)

src/
components/
articleCard.jsx
articlesList.jsx
pages/
allArticlesPages.jsx
api/
ncNewsApi.js
App.jsx
main.jsx

---

## Planned Features

View single article page
Vote on articles (optimistic updates)
View comments
Post comments
Delete comments
Filter and sort articles
Topic-based routing

---

### Backend Repository

Backend project built with:
Express
PostgreSQL
Supabase
Hosted on Render

---

### Author

Xiaolu - Built as part of the Northcoders Full Stack Bootcamp.

---

## Features

- View a list of all articles
- View an individual article via dynamic routing (`/articles/:article_id`)
- Display article metadata (author, topic, date)
- Display article votes and comment count
- Fetch and display article comments
- Loading and error handling states implemented
- Mobile-first responsive layout
