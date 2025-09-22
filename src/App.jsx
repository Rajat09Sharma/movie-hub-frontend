import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./pages/RootLayout"
import { AuthLayout } from "./pages/AuthLayout"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"
import { HomePage } from "./pages/HomePage"
import { MoviesPage } from "./pages/MoviesPage"
import { MoviePage } from "./pages/MoviePage"


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/movies",
        element: <MoviesPage />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />
      },
      {
        path: "/auth/signup",
        element: <SignupPage />,
      }
    ]
  }
])


function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
