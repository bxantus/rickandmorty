import React from "react";
import { Character, Result, getCharacter } from "./rickandmortyapi";
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export function loader({ params }:LoaderFunctionArgs) {

    return getCharacter(params.characterId ?? 1)
}

export default function ProfilePage() {
    const navigate = useNavigate()
    const character = useLoaderData() as Result<Character>
    return <Container className="p-3">
        {/* Navigate -1 corresponds to going back one page in the history */}
        <Button onClick={()=> navigate(-1)}>Back</Button> 
        {
            character.kind == "error" ?
                <Alert variant="error">Error</Alert>
                :
                <Profile character={character.data} />
        }
    </Container>
}

function Profile({character}:{character:Character}) {
    return <Card>
        <Card.Img id="profileImage" src={character.image}/>
        <Card.Body>
            <Card.Title>{character.name}</Card.Title>
            <Card.Subtitle>{character.species}, {character.gender}</Card.Subtitle>
            <ListGroup>
                <InfoEntry title="Status" text={character.status}/>
                <InfoEntry title="Type" text={character.type}/>
                <InfoEntry title="Origin location" text={character.origin.name}/>
                <InfoEntry title="Last known location" text={character.location.name}/>
                
                <ListGroup.Item>
                    <div className="fw-bold">Episodes</div>
                    {/* todo */}
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
}

function InfoEntry({title, text}:{title:string, text:string}) {
    if (!text)
        return <></>
    return <ListGroup.Item>
        <div className="fw-bold">{title}</div>
        {text}
    </ListGroup.Item>
}