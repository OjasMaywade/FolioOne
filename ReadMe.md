# FolioOne

**FolioOne** is a clean, responsive blogging website template — built to help writers, developers, and creators publish articles in a simple, organized, and distraction-free layout. It’s inspired by the original FolioOne Bootstrap design but adapted and extended to function purely as a blogging platform, focusing on readability, content structure, and ease of navigation.

---

## Table of Contents

- [About](#about)  
- [Motivation & Goals](#motivation--goals)  
- [Features](#features)  
- [Tech Stack & Libraries](#tech-stack--libraries)  
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)  
- [Installation & Running Locally](#installation--running-locally)  
- [Deployment](#deployment)  
- [Design & Architecture Notes](#design--architecture-notes)  
- [Planned Improvements / Future Work](#planned-improvements--future-work)  
- [Credits & Acknowledgements](#credits--acknowledgements)  
- [License](#license)  

---

## About

FolioOne Blog API is a backend project I built to learn, improve, and practise real-world backend architecture. It provides the core features needed for a blogging platform—managing posts, comments, and authentication—while keeping everything clean and simple under the hood. This project reflects my approach to building practical, maintainable systems as I grow as a backend developer.

---

## Motivation & Goals

FolioOne Blog API started as a personal learning project. I wanted to go beyond typical tutorials and build something that feels like a real backend service—not just for practice, but as a foundation I can grow and improve over time. Working with TypeScript, PostgreSQL, and AWS gave me the chance to understand how production systems are actually built and deployed.

My goals with this project were simple:

- Build a real blogging backend from scratch.
- Use proper patterns like controllers, services, and repositories.
- Deploy the app on AWS the same way real companies do.
- Work with type-safe SQL and database design.
- Improve my ability to architect and maintain clean backend code.

---

## Features

- **RESTful blogging API**
  - Clean, resource-oriented endpoints for managing posts, tags, and comments.

- **Post management**
  - Create, read, update, and delete blog posts with support for draft/published status.

- **Comments system**
  - Add comments under posts, with support for nesting (parent_comment) and fetching comment threads.

- **Tag-based organization**
  - Attach tags to posts and filter posts by tag.

- **Search & filtering**
  - Query posts by title, content, or tags using query parameters.

- **Pagination**
  - Consistent pagination on list endpoints to handle large datasets.

- **Error handling & validation**
  - Centralized error responses and input validation for predictable API behaviour.

- **Environment-based configuration**
  - Uses environment variables for DB credentials, ports, and secrets.

- **Layered architecture**
  - Clear separation between routes, controllers, services, repositories, and DB layer for maintainability and testability.

---

## Tech Stack & Libraries

- **TypeScript** – the main language of the project, providing strong typing, cleaner code, and fewer runtime errors.
- **Node.js + Express** to handle all HTTP requests and create a predictable REST API structure.
- **MySQL** as the main database since it’s stable and great for relational data like posts and comments.
- **Kysely** for type-safe SQL, which helps reduce mistakes and keeps the database layer clean.
- **Authentication tools** (JWT, bcrypt) to support secure login when needed.
- **Zod** – for validating incoming API requests
- **AWS S3** – used to store static assets such as images or media files that may be attached to blog posts
- **AWS EC2** – virtual server instance used to deploy and run the Node.js backend in production.
- **AWS RDS (MySQL)** – managed cloud database service used to host the production database securely.
- **Nginx** – optional reverse proxy for performance, SSL, and request routing.
- **dotenv & other utilities** to keep the project environment-friendly and easy to configure. 

---

## Architecture Overview

FolioOne follows a layered backend architecture:

- **Routes**
  - Define the HTTP endpoints and map them to controllers.
  - Example: `POST /api/v1/posts` → `postController.createPost`.

- **Controllers**
  - Handle HTTP-level concerns:
    - Parse request params/body.
    - Call the appropriate service.
    - Map service results to HTTP responses (status codes, JSON shapes).

- **Services**
  - Contain business logic:
    - Validation that depends on DB state.
    - Rules like "only author can update a post", "only published posts are public", etc.
    - Orchestrate multiple repositories in one use case.

- **Repositories / DB Layer**
  - Encapsulate all database queries.
  - Responsible for talking to the underlying SQL database and returning typed results.
  - Makes it easier to:
    - Swap or upgrade the DB layer.
    - Unit test services by mocking repository functions.

- **Middlewares**
  - Cross-cutting concerns:
    - Authentication & authorization
    - Request logging
    - Error handling
    - Validation

- **Types & Utils**
  - Shared TypeScript types/interfaces.
  - Utility helpers (e.g. slug generator, pagination helpers, error builders).
