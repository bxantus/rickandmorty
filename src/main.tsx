import React, { ReactElement, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider,  createHashRouter } from "react-router-dom";
import ProfilePage, {loader as profileLoader} from "./profile";
import CharactersPage, { loader as characterLoader } from "./charactersPage";

// using hash router instead of browser router  as it's easier to setup with gihub pages (and esbuild serve)
// see: https://reactrouter.com/en/main/routers/create-hash-router
const router = createHashRouter([
    {
        path: "/",
        element: <CharactersPage/>,
        loader: characterLoader,
    },
    {
        path: "characters/:characterId",
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
