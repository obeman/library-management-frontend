# Library Management System Frontend

A Vue.js frontend application for managing a library's books, authors, and members. This application provides a responsive user interface for managing library resources and borrowing operations.

## Features

- Responsive UI that works on both mobile and desktop
- CRUD operations for books, authors, and members
- Book borrowing and return functionality
- Search functionality across all entities
- Relationship management between books, authors, and borrowed books

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Configure the backend API URL:
Edit `src/config/axios.js` and update the `baseURL` to match your Spring Boot backend URL.

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/       # Reusable Vue components
├── config/          # Configuration files
├── router/          # Vue Router configuration
├── stores/          # Pinia stores for state management
├── views/           # Page components
└── App.vue          # Root component
```

## API Integration

The application integrates with a Spring Boot backend API. The following endpoints are used:

- Books: `/api/books`
- Authors: `/api/authors`
- Members: `/api/members`
- Borrowed Books: `/api/borrowed-books`

## Development

- The application uses Vue 3 with the Composition API
- Vuetify is used for UI components
- Pinia is used for state management
- Axios is used for API calls

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
