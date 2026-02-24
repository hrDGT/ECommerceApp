import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./pages/Layout";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: CatalogPage,
      },
      {
        path: "sign_in",
        Component: SignInPage,
      },
      {
        path: "sign_up",
        Component: SignUpPage,
      },
    ],
  },
]);

export default router;
