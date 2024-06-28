# Article Arc Website

This is a blog website built with Next.js, MongoDB, Tailwind CSS, and TypeScript. The application allows users to read and create blog posts, featuring a modern and responsive design.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)

## Features

- User authentication and authorization
- Create, read, and delete blog posts
- Responsive design using Tailwind CSS
- SEO-friendly URLs
- Server-side rendering for improved performance and SEO
- Data fetching with React Query
- State management with React hooks and Redux Tool Kit

## Technologies Used

- [Next.js](https://nextjs.org/) - The React framework for server-side rendering and static site generation
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing blog posts and user data
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript for type safety and better developer experience

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- MongoDB instance (local or hosted)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Chakravarthy-E/ArticleArc.git
    cd blog-website
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
    ```
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) to view the website in your browser.

## Usage

- To create a new blog post, navigate to the "Profile" page after logging in.
- To view all blog posts, navigate to the home page.
- Click on a blog post title to read the full content.
- Delete your own posts using the respective buttons on the profile page.


