import React, { ReactElement, useState } from "react";
import { createRoot } from "react-dom/client";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { CharactersResponse, Result, getCharacters } from "./rickandmortyapi";
import CharactersTable from "./characters";
import Alert from "react-bootstrap/Alert";

type Query<T> = Result<T> | { kind: "inprogress"} | { kind: "notstarted" }

function App() {
    // todo: maybe separate loading progress from the result data, it would be clearer
    const [characterRes, updateCharacters] = useState<Query<CharactersResponse>>({kind:"notstarted"})
    
    async function fetchCharacters() {
        updateCharacters({kind:"inprogress"})
        updateCharacters(await getCharacters())
    }
    if (characterRes.kind == "notstarted") {
        // start fetching and update at the end
        fetchCharacters()
    }

    let characterDetails:ReactElement

    if (characterRes.kind == "success") {
        characterDetails = <CharactersTable characters={characterRes.data.results}></CharactersTable>
    } else if (characterRes.kind == "notstarted" || characterRes.kind =="inprogress") characterDetails = <p>{characterRes.kind}</p> 
    else characterDetails = <Alert variant="error">{characterRes.description}</Alert>

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
