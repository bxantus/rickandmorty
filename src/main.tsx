import React, { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import { CharactersResponse, Result, getCharacters } from "./rickandmortyapi";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";


function Root({characters}:{ characters:Result<CharactersResponse> }) {
    let characterDetails:ReactElement

    if (characters.kind == "success") {
        characterDetails = <Table striped hover>
            <thead>
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Species</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {characters.data.results.map( character => <tr className="align-middle" key={character.id}>
                    <td><img className="img-fluid" src={character.image}></img></td>
                    <td>{character.name}</td>
                    <td>{character.species}</td>
                    <td>{character.status}</td>
                </tr>)}
            </tbody>
        </Table>
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
        <Root characters={characters}>

        </Root>
    );
}
