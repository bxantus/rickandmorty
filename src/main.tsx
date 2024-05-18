import React, { ReactElement, useState } from "react";
import { createRoot } from "react-dom/client";
import Container from "react-bootstrap/Container"
import { CharactersResponse, Result, getCharacters } from "./rickandmortyapi";
import CharactersTable from "./characters";
import Alert from "react-bootstrap/Alert";
import Pager from "./pager";
import { RouterProvider,  createHashRouter } from "react-router-dom";
import Profile, {loader as profileLoader} from "./profile";


function App() {
    const [characterRes, updateCharacters] = useState<Result<CharactersResponse>|undefined>()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [numPages, setNumPages] = useState(0) // 0 means we don't know yet
    
    async function fetchCharacters(forPage:number) {
        setLoading(true)
        setPage(forPage)
        const res = await getCharacters({page: forPage})
        updateCharacters(res)
        if (res.kind == "success")
            setNumPages(res.data.info.pages)
        setLoading(false)
    }
    if (!loading && !characterRes) // initial fetch
        fetchCharacters(page)

    let characterDetails:ReactElement = <></>

    if (characterRes?.kind == "success") {
        characterDetails = <CharactersTable characters={characterRes.data.results}></CharactersTable>
    } else if (characterRes) characterDetails = <Alert variant="error">Error: {characterRes.description}</Alert>

    return <Container className="p-3">
                {numPages > 0 ? <Pager page={page} numPages={numPages} onPageChanged={ p=> fetchCharacters(p) } ></Pager> : undefined}
                {characterDetails}
    </Container>
}

// using hash router instead of browser router  as it's easier to setup with gihub pages (and esbuild serve)
// see: https://reactrouter.com/en/main/routers/create-hash-router
const router = createHashRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "characters/:characterId",
        loader: profileLoader,
        element: <Profile/>
    }
])

window.onload = async () => {
    const root = createRoot(document.getElementById("root")!);
    root.render(
        <RouterProvider router={router} />
    );
}
