import React, { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { CharactersResponse, Result, getCharacters } from "./rickandmortyapi";
import CharactersTable from "./characters";
import Alert from "react-bootstrap/Alert";


function App({characters}:{ characters:Result<CharactersResponse> }) {
    let characterDetails:ReactElement

    if (characters.kind == "success") {
        characterDetails = <CharactersTable characters={characters.data.results}></CharactersTable>
    } else characterDetails = <Alert variant="error">{characters.description}</Alert>

    return <Container className="p-3">
                {characterDetails}
                <Button>Ok</Button>
    </Container>
}

window.onload = async () => {
    const root = createRoot(document.getElementById("root")!);
    const characters = await getCharacters()
    console.log(characters)
    root.render(
        <App characters={characters}>

        </App>
    );
}
