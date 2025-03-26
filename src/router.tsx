import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Tv from "./Routers/Tv";
import Home from "./Routers/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movies/:movieId", element: <Home /> },
      { path: "tv", element: <Tv /> },
    ],
  },
]);

export default router;
