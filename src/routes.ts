import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
  },
]);

export default router;
