# Project Name: Globab (Frontend)

## Introduction

This project is the frontend application for **Globab**, developed using **React** and associated libraries. Follow the instructions below to set up and run the project locally.

---

## Prerequisites

Before running the project, ensure the following are installed on your system:

- **Node.js** (v16 or higher recommended)
- **npm** (v8 or higher recommended)

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/24-2-CAU-Capstone-02/frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

---

## Available Scripts

In the project directory, you can run the following scripts:

### 1. Start Development Server

```bash
npm start
```
- Starts the application in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The application will automatically reload if you make edits to the code.

---

### 2. Run Tests

```bash
npm test
```
- Launches the test runner in interactive watch mode.

---

### 3. Build for Production

```bash
npm run build
```
- Builds the app for production into the `build/` folder.
- The build is optimized and minified for best performance.

---

## Project Structure

```plaintext
frontend/
├── public/          # Static files like index.html and favicon
├── src/             # Source code for the application
│   ├── components/  # Reusable React components
│   ├── pages/       # Page components for routing
│   ├── utils/       # Utility functions and helpers
│   └── App.tsx      # Main application component
├── package.json     # Project dependencies and scripts
└── README.md        # Project documentation
```

---

## Additional Notes

- Ensure the backend server is running and accessible if the application makes API calls.
- Update `.env` file with required environment variables before running the project.

---

## Contact

For any issues or queries, please contact the development team or open an issue in the repository.