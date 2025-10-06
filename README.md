# Expense Tracker UI (React + Vite)

This is the frontend for the Expense Tracker web application. It's a modern, responsive, and user-friendly interface built with React and Vite, designed to provide a seamless experience for managing personal finances.

## Features

- **Interactive Dashboard**: A clean and intuitive dashboard to view, add, edit, and delete expenses.
- **Data Visualization**: Beautiful and responsive charts (Bar and Doughnut) powered by Chart.js to help users visualize their spending habits by month and category.
- **Dark & Light Mode**: A theme toggler for user comfort, with the selected preference saved in local storage. The UI is fully themed for both modes.
- **Responsive Design**: The entire application is built with Tailwind CSS to be fully responsive, looking great on desktops, tablets, and mobile devices.
- **Client-Side Routing**: Uses React Router for fast and smooth navigation between login, signup, and dashboard pages.
- **Efficient API Communication**: Uses Axios for all communication with the backend API, including managing JWT tokens for authenticated requests.
- **Fast Development Experience**: Built with Vite for near-instant server start and hot module replacement.

## Tech Stack

- **Core Library**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) with `react-chartjs-2`
- **API Client**: [Axios](https://axios-http.com/)
- **Icons**: [Heroicons](https://heroicons.com/)

---

## Getting Started

Follow these instructions to get the frontend client running on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- `npm` or `yarn` package manager

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/David234-star/Expense-Tracker-Frontend.git
    cd Expense-Tracker-Frontend/frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a file named `.env` in the `frontend` directory. This file will tell your frontend application where the backend API is located.

    ```dotenv
    # .env

    # The URL of your running FastAPI backend server
    VITE_API_URL=http://127.0.0.1:8000
    ```

    **Note**: The `VITE_` prefix is required by Vite to expose the variable to the client-side code.

### Running the Application

Make sure your backend server is running first. Then, in the `frontend` directory, run the development server:

```bash
npm run dev
```

The application will now be available at `http://localhost:5173` (or another port if 5173 is busy).

---

## Project Structure

The project is organized into logical folders for maintainability:

```
/src
|-- /components    # Reusable React components (Dashboard, Navbar, Forms, etc.)
|-- /context       # React Context providers (e.g., ThemeContext)
|-- /services      # API communication layer (api.js with Axios)
|-- App.jsx        # Main application component with routing logic
|-- index.css      # Global styles and Tailwind CSS directives
|-- main.jsx       # The entry point of the React application
```

## Deployment

This application is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  On Vercel, import the project from your repository.
3.  Vercel will automatically detect it as a Vite project and configure the build settings.
4.  Add the `VITE_API_URL` environment variable in the Vercel project settings, pointing it to your live backend URL (e.g., your Render service URL).
5.  Deploy! Vercel will handle the rest.
