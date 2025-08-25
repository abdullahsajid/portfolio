import React, { lazy } from "react";
import Home from "./pages/Home";
import ReactGA from "react-ga4";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Chat from "./pages/chat";
ReactGA.initialize("G-Y38T7CPZ67");
const Resume = lazy(() => import('./pages/Resume'))

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <div>Something went wrong!</div>,
      element: (
        <React.Suspense
          fallback={
            <div className="flex justify-center items-center w-full h-screen">
              Loading...
            </div>
          }
        >
          <Home />
        </React.Suspense>
      ),
    },
    {
      path: "/resume",
      errorElement: <div>Something went wrong!</div>,
      element: (
        <React.Suspense
          fallback={
            <div className="flex justify-center items-center w-full h-screen">
              Loading...
            </div>
          }
        >
          <Resume />
        </React.Suspense>
      ),
    },
    {
      path: "/ai",
      errorElement: <div>Something went wrong!</div>,
      element: (
        <React.Suspense
          fallback={
            <div className="flex justify-center items-center w-full h-screen">
              Loading...
            </div>
          }
        >
          <Chat />
        </React.Suspense>
      ),
    },
  ])
  return <RouterProvider router={router} />
}

export default App;