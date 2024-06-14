# Todo Group Status App

This is a React application that allows users to manage to-do items by creating groups and viewing the completion status of each item. The application uses Redux for state management.

## Features

- Create groups to manage to-do items.
- Automatically assign consecutive ranges without gaps for new groups.
- View the completion status of to-do items within each group.
- Remove groups when they are no longer needed.
- Display a check icon at the end of the status list.
- Validation error messages for invalid group configurations.
- Unit tests for components and Redux store.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm (Node package manager)

### Installing

Follow these steps to get a development environment running:

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd todo-group-status
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

### Running Tests

To run unit tests, use the following command:

```bash
npm test
