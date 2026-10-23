# Authentication with cookie — Authentication System

AuthApp is a full-stack authentication application built with React, Redux Toolkit, Node.js, and Express.js. It provides user registration, login, logout, and cookie-based authentication using JSON Web Tokens (JWT).

The application uses HttpOnly cookies to protect authentication tokens and Redux Toolkit to manage frontend authentication state. It also supports restoring the user's session after a page refresh.

## 🚀 Features

- **User Registration** — Create a new account using name, email, and password.
- **User Login** — Authenticate users with valid credentials.
- **Cookie-Based Authentication** — Store access and refresh tokens in HttpOnly cookies.
- **Session Persistence** — Restore authentication after refreshing the page.
- **Protected Routes** — Restrict access to authenticated pages.
- **Access Token Refresh** — Request a new access token when the current one expires.
- **Logout** — Clear authentication cookies through the backend.
- **Redux Toolkit** — Manage authentication state and API request status.
- **Axios Integration** — Communicate with backend APIs using HTTP requests.
- **Form Validation** — Validate required registration and login fields.
- **Toast Notifications** — Display success and error messages.
- **Responsive UI** — Style the authentication pages with Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Cookie Parser
- CORS

## 📁 Project Structure

```text
AuthApp/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── features/
│   │   │   └── auth/
│   │   │       ├── authSlice.js
│   │   │       └── authService.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   └── userController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

*Adjust the structure to match your actual project directories and filenames.*

## ⚙️ Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB
- Git

## 📦 Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd AuthApp
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file in the backend directory.

```env
PORT=4040
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Use the exact variable names expected by your backend code. Keep your real secrets private and never commit your `.env` file.

### 4. Start the Backend

```bash
npm run dev
```

Use the appropriate command from your backend `package.json` if the `dev` script is not configured.

### 5. Install Frontend Dependencies

Open a separate terminal:

```bash
cd client
npm install
```

### 6. Configure the Vite Proxy

In `vite.config.js`, configure the development proxy to forward API requests to your backend:

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4040",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

### 7. Start the Frontend

```bash
npm run dev
```

Open the URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## 🔐 Authentication Flow

AuthApp uses JWT-based authentication with HttpOnly cookies.

1. The user submits the registration or login form.
2. The frontend sends the credentials to the backend using Axios.
3. The backend validates the submitted credentials.
4. The backend generates access and refresh tokens.
5. The backend sets the tokens as HttpOnly cookies using `Set-Cookie` response headers.
6. The browser manages the cookies and sends eligible cookies with subsequent API requests.
7. The backend middleware validates the access token before granting access to protected endpoints.
8. When the access token expires, the frontend can call the refresh endpoint to obtain a new access token.
9. On page refresh, the frontend verifies the session with the backend and restores the Redux authentication state.
10. On logout, the backend clears the authentication cookies.

### Why HttpOnly Cookies?

HttpOnly cookies prevent client-side JavaScript from reading authentication tokens through `document.cookie`. This helps reduce the risk of token theft through cross-site scripting (XSS).

Cookie-based authentication still requires appropriate CSRF protection, secure cookie configuration, and server-side token validation.

## 🔗 Authentication API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in a user |
| POST | `/api/auth/refresh` | Refresh the access token |
| POST | `/api/auth/logout` | Clear authentication cookies |
| GET | `/api/auth/me` | Get the current authenticated user |

The `/me` endpoint is needed for session restoration and must be implemented in the backend if it does not already exist. Confirm the actual endpoint paths in your route definitions.

## 🧠 Frontend Authentication State

Redux Toolkit manages the frontend authentication state.

Typical state properties include:

- `user` — Stores the authenticated user's information.
- `isLoading` — Indicates whether an authentication request is in progress.
- `isSuccess` — Indicates a successful authentication operation.
- `isError` — Indicates whether an operation failed.
- `isErrorMessage` — Stores an error message.
- `authInitialized` — Indicates whether the initial session check has completed.

The frontend does not need to store authentication tokens in `localStorage`. Instead, it uses the browser-managed cookies and validates the session with the backend.

## 🧪 Testing

Test the following scenarios:

- Register a new account.
- Log in with valid credentials.
- Verify that invalid credentials produce an appropriate error.
- Access a protected endpoint with valid cookies.
- Refresh the browser and verify that the session persists.
- Verify access-token refresh behavior.
- Log out and confirm that cookies are cleared.
- Attempt to access protected pages without a valid session.
- Confirm that loading indicators and error notifications work correctly.

Use Chrome DevTools, Postman, or Insomnia to inspect API requests, response headers, and cookie behavior.

## 🔒 Security Best Practices

- Use HttpOnly cookies for authentication tokens.
- Enable `Secure` cookies in production over HTTPS.
- Configure CORS with explicit trusted origins.
- Use appropriate `SameSite` cookie settings.
- Implement CSRF protection where needed.
- Validate access and refresh tokens on the backend.
- Keep JWT secrets in environment variables.
- Never expose credentials or secrets in frontend code.
- Avoid committing `.env` files to Git.

## 🌐 Deployment Checklist

Before deployment:

- Configure production environment variables.
- Use a production MongoDB connection.
- Deploy the frontend and backend over HTTPS.
- Configure the correct frontend origin in backend CORS.
- Verify cookie settings for your deployment domains.
- Test login, session restoration, refresh, and logout.
- Ensure environment files and secrets are excluded from version control.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Test the application.
5. Submit a pull request.

## 📄 License

Add a suitable license, such as the MIT License, if you intend to distribute this project under those terms.

---

**AuthApp — Simple, Secure, Cookie-Based Authentication.**
