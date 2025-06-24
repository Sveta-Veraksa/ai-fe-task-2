# Users Management Application

A responsive React application for managing user data with TypeScript and CSS Modules.

## Overview

This application displays user data in a table format with the following features:
- Responsive design that works on different screen sizes
- Interactive table with user information
- Detailed user information in a modal dialog
- Ability to delete users from the table
- Map integration for viewing user locations
- Keyboard accessibility for all interactions

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **CSS Modules** - Scoped styling
- **Modern CSS** - Responsive design with CSS variables and modern layout techniques

## Project Structure

```
src/
├── components/
│   ├── UsersTable/
│   │   ├── UsersTable.tsx       # Table component for displaying users
│   │   └── UsersTable.module.css # Styles for the table component
│   └── UserDetails/
│       ├── UserDetails.tsx      # Modal component for user details
│       └── UserDetails.module.css # Styles for the modal component
├── services/
│   └── api.ts                   # API service for fetching user data
├── types/
│   └── index.ts                 # TypeScript interfaces
├── styles/
│   └── (global styles)          # Global styles
├── App.tsx                      # Main application component
├── App.css                      # App-specific styles
├── main.tsx                     # Application entry point
└── index.css                    # Global CSS variables and styles
```

## Features

### Users Table

The main table displays user information with the following columns:
- Name / Email
- Address
- Phone
- Website
- Company
- Action (Delete button)

Users can:
- Click on any row to view detailed information
- Click on website links to visit the user's website
- Click the delete button to remove a user from the table
- Navigate the table using keyboard (Tab, Enter, Space)

### User Details Modal

When a user is selected, a modal dialog displays detailed information:
- User's name and email
- Complete address information
- Button to view the user's location on a map
- Contact information (phone and website)
- Company details (name, catchphrase, business)

The modal is fully accessible with:
- Keyboard navigation
- Focus management
- Screen reader support
- Close button and escape key functionality
- Click outside to close

## API Integration

The application fetches user data from the JSONPlaceholder API:
- `https://jsonplaceholder.typicode.com/users`

User data includes:
- Personal information (name, email, phone)
- Address with geo coordinates
- Company information

## Accessibility Features

The application follows accessibility best practices:
- Semantic HTML structure
- ARIA attributes for improved screen reader experience
- Keyboard navigation support
- Focus management in modals using the native `<dialog>` element
- Descriptive labels for interactive elements
- Proper color contrast for text readability

## Responsive Design

The application is fully responsive and works on:
- Desktop screens
- Tablets
- Mobile devices

CSS features used:
- CSS variables for consistent theming
- Flexbox and Grid for layouts
- Media queries for responsive adjustments
- Modern CSS best practices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage Examples

### Viewing User Details
- Click on any user row in the table to view detailed information
- Press Tab to navigate to a user row and press Enter to view details

### Deleting a User
- Click the "×" button in the Action column to delete a user
- Navigate to the delete button using Tab and press Enter

### Viewing User Location
- Open user details and click "View on map" to see the user's location on Google Maps

## License

This project is licensed under the MIT License - see the LICENSE file for details.
