import React from "react";
import { Character, Result, getCharacter } from "./rickandmortyapi";
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";

export function loader({ params }:LoaderFunctionArgs) {

    return getCharacter(params.characterId ?? 1)
}

export default function Profile() {
    const navigate = useNavigate()
    const character = useLoaderData() as Result<Character>
    return <Container className="p-3">
        {/* Navigate -1 corresponds to going back one page in the history */}
        <Button onClick={()=> navigate(-1)}>Back</Button> 
        {
            character.kind == "error" ?
                <Alert variant="error">Error</Alert>
                :
                <h1>{character.data.name}</h1>
        }
    </Container>
}