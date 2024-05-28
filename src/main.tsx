import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider,  createHashRouter } from "react-router-dom";
import ProfilePage, {loader as profileLoader} from "./profilePage";
import CharactersPage, { loader as characterLoader } from "./charactersPage";
import { ErrorPage } from "./errorComponents";

// using hash router instead of browser router  as it's easier to setup with gihub pages (and esbuild serve)
// see: https://reactrouter.com/en/main/routers/create-hash-router
const router = createHashRouter([
    {
        path: "/",
        element: <CharactersPage/>,
        loader: characterLoader,
        errorElement: <ErrorPage/>
    },
    {
        path: "profile/:characterId",
        loader: profileLoader,
        element: <ProfilePage/>
    }
])

window.onload = async () => {
    const root = createRoot(document.getElementById("root")!);
    root.render(
        <RouterProvider router={router} />
    );
}
