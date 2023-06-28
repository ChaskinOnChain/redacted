# Next.js Social Networking Platform

This project is a social networking platform powered by Next.js. It aims to provide a Facebook-like experience to users, enabling them to add friends, post images/text, and create profiles. 

## Features

- **Authentication**: Users can authenticate using Google, Facebook, or email/password.
- **Add Friends**: Users can add friends.
- **Posting**: Users can create posts containing images and text.
- **Profile Creation**: Each user can create a personalized profile.
- **Search**: The platform includes a search function for users to find posts.

## Code Overview

The main file, `page.js`, uses the `next-auth/react` package to manage user sessions. Depending on the session status, the user is either shown a loading spinner, redirected to the login page, or shown the main page.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone <your-repo-url>

# Go into the repository
$ cd <your-repo-directory>

# Install dependencies
$ npm install

# Run the app
$ npm run dev
