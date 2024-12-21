Job Listing Website
A full-stack web application for job listings built with Django REST Framework and React. This application allows users to view job listings and post new job opportunities.
Features

View all job listings with detailed information
Create new job listings
Responsive design that works on both desktop and mobile devices
RESTful API backend
Clean and intuitive user interface

Tech Stack
Backend

Django
Django REST Framework
MySQL
django-cors-headers

Frontend

Vite React
CSS3
Fetch API for HTTP requests

API Endpoints
GET /api/jobs/

Retrieves all job listings
Returns a JSON array of job objects

POST /api/jobs/create/

Creates a new job listing
Requires a JSON body with the following fields:

title (string)
company (string)
location (string)
description (string)
salary (string)


 

