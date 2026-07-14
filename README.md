# Codibly Frontend Application

This is the frontend application for the Codibly recruitment task. It provides a user interface to display current and forecasted energy generation data for the UK and calculates optimal electric vehicle charging windows based on clean energy availability.

## Technologies
* React
* TypeScript
* Vite

## Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

## Getting Started

1. Navigate to the `codibly` directory:
   ```bash
   cd codibly
   ```

2. Install dependencies:
   ```
   npm install
   ```
3. Create .env file:
   ```
   VITE_API_BASE_URL=http://localhost:8080
   ```
4. Start dev server:
   ```
   npm run dev
   ```

# Deployment
The application is configured to be deployed on platforms like Render. Ensure the VITE_API_BASE_URL environment variable is set in your deployment environment pointing to the live backend URL.
   
