# Project Overview

This is a Create React App frontend for an ecommerce/admin dashboard. It uses React 18, Redux, React Router v5, Material UI, Axios, Bootstrap assets, and a hosted backend API configured through `REACT_APP_SERVER_URL`.

# Project Structure

- `src/`: React application source code
- `src/redux/`: Redux actions and reducers for user/admin data
- `src/views/`: Login, admin screens, shared UI components, and styles
- `public/`: Create React App public assets and HTML template
- `build/` and `ROOT/`: Existing production build output from the import
- `.env`: React build/runtime environment variables

# Replit Setup

- Runtime: Node.js 20
- Development workflow: `HOST=0.0.0.0 PORT=5000 DANGEROUSLY_DISABLE_HOST_CHECK=true npm start`
- Preview port: 5000
- Deployment: static site build using `npm run build`, serving the `build` directory

# Notes

- The app depends on the external backend at `https://profee.in/ecommerce/ecommerce`.
- React cleanup was performed to remove compile-time ESLint/accessibility warnings while preserving UI and business logic.
- The development workflow currently compiles successfully and the preview loads the login screen.
