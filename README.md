# Authentication System

A complete authentication and management system built with HTML, CSS, and Vanilla JavaScript. This system provides user authentication, system management, user management, and profile management with role-based permissions.

## Features

- **Authentication**
  - User login/logout functionality
  - Session management using localStorage
  - Secure password handling

- **Systems Management**
  - Create new systems
  - View all systems
  - Delete systems
  - Toggle system active status

- **Users Management**
  - Create new users
  - View all users
  - Delete users
  - User activation status
  - Secure password storage

- **Profiles Management**
  - Create new profiles with permissions
  - View all profiles
  - Delete profiles
  - Link profiles to systems
  - Granular permissions (Index, Update, Insert, Delete)

## Project Structure

```
├── index.html           # Main HTML file
├── style.css           # Global styles
├── main.js             # Application entry point
├── db.json             # JSON Server database
├── pages/              # Page components
│   ├── login.js        # Login page
│   ├── systems.js      # Systems management
│   ├── users.js        # Users management
│   └── profiles.js     # Profiles management
└── utils/              # Utility functions
    ├── api.js          # API calls
    └── auth.js         # Authentication helpers
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

This will start:
- Vite dev server on port 5173
- JSON Server on port 3001

## Database Structure

### Systems
```json
{
  "siscodigo": number,
  "sisnome": string,
  "sisativo": boolean
}
```

### Users
```json
{
  "usucodigo": number,
  "usunome": string,
  "usulogin": string,
  "ususenha": string,
  "usuativo": boolean
}
```

### Profiles
```json
{
  "codigo": number,
  "nome": string,
  "siscodigo": number,
  "permissions": {
    "index": boolean,
    "update": boolean,
    "insert": boolean,
    "delete": boolean
  }
}
```

## API Endpoints

### Systems
- GET `/systems` - Get all systems
- POST `/systems` - Create new system
- DELETE `/systems/:id` - Delete system

### Users
- GET `/users` - Get all users
- POST `/users` - Create new user
- DELETE `/users/:id` - Delete user
- GET `/users?usulogin=:login&ususenha=:password` - User authentication

### Profiles
- GET `/profiles` - Get all profiles
- POST `/profiles` - Create new profile
- DELETE `/profiles/:id` - Delete profile

## Security Features

- Password fields are properly handled in forms
- Active session management
- User authentication check on protected routes
- Input validation for all forms
- Duplicate entry prevention for system codes, user codes, and profile codes

## Browser Support

The application is built with modern JavaScript features and is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

The project uses:
- Vite for development server and building
- JSON Server for mock backend
- Axios for API requests
- Vanilla JavaScript for DOM manipulation
- CSS3 for styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request