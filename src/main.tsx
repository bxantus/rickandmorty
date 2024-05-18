import React, { ReactElement, useState } from "react";
import { createRoot } from "react-dom/client";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { CharactersResponse, Result, getCharacters } from "./rickandmortyapi";
import CharactersTable from "./characters";
import Alert from "react-bootstrap/Alert";


function App() {
    const [characterRes, updateCharacters] = useState<Result<CharactersResponse>|undefined>()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    
    async function fetchCharacters(forPage:number) {
        setLoading(true)
        updateCharacters(await getCharacters({page: forPage}))
        setLoading(false)
    }
    if (!loading && !characterRes) // initial fetch
        fetchCharacters(page)

    let characterDetails:ReactElement = <></>

    if (characterRes?.kind == "success") {
        characterDetails = <CharactersTable characters={characterRes.data.results}></CharactersTable>
    } else if (characterRes) characterDetails = <Alert variant="error">{characterRes.description}</Alert>

    return <Container className="p-3">
                {characterDetails}
                <Button>Ok</Button>
    </Container>
}

window.onload = async () => {
    const root = createRoot(document.getElementById("root")!);
    root.render(
        <App >

        </App>
    );
}
