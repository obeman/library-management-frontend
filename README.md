# Library Management System

A modern and responsive library management system built with Vue.js, featuring a clean and intuitive user interface for managing books, authors, members, and book borrowing operations.

## Features

- 📚 **Book Management**
  - Add, edit, and delete books
  - Track book availability
  - View book details including title, author, ISBN, and publication year
  - Search and filter books

- 👥 **Author Management**
  - Manage author information
  - View books by specific authors
  - Add and edit author details

- 👤 **Member Management**
  - Register and manage library members
  - Track member borrowing history
  - View member details and contact information

- 📖 **Borrowing System**
  - Borrow and return books
  - Track due dates
  - View borrowing history
  - Manage book availability

## Tech Stack

- Vue.js 3
- Vue Router
- Vuetify 3
- Axios for API communication
- Vuex for state management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd library-management-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
VITE_API_URL=your_api_url_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable Vue components
├── views/          # Page components
├── router/         # Vue Router configuration
├── store/          # Vuex store modules
├── services/       # API services
└── utils/          # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Integration

The system is designed to work with a RESTful API. Update the API configuration in `src/services/api.js` to match your backend service.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
