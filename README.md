# 🎬 Movie Recommendation System

A full-stack Movie Recommendation System built using React, FastAPI, and Machine Learning. The application recommends similar movies using content-based and hybrid recommendation techniques and allows users to manage personal watchlists.

## 🚀 Live Demo

- Frontend: (https://movie-recommendation-system-j6ig-19sv1i28o.vercel.app/login)
- Backend API: (https://movie-recommendation-system-urau.onrender.com)

## Features

- Movie recommendations using Machine Learning
- Content-based and hybrid filtering
- User authentication (Login/Signup)
- JWT-based authorization
- Add movies to watchlist
- FastAPI REST APIs
- React frontend

## Tech Stack

**Frontend:** React, Axios, React Router

**Backend:** FastAPI, SQLAlchemy, SQLite

**Machine Learning:** Pandas, NumPy, Scikit-Learn

## Installation

### Backend

```bash
cd server
pip install -r requirements.txt
uvicorn app.main:app --reload
