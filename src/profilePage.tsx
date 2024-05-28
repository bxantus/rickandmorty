import React from "react";
import { Character, Result, getCharacter } from "./rickandmortyapi";
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { ErrorAlert } from "./errorComponents";

export function loader({ params }:LoaderFunctionArgs) {
    return getCharacter(params.characterId ?? 1)
}

export default function ProfilePage() {
    const navigate = useNavigate()
    const character = useLoaderData() as Result<Character>
    // Navigate -1 corresponds to going back one page in the history 
    const navigateBack = ()=> navigate(-1)
    return <Container className="p-3 d-flex justify-content-center">
        {
            character.kind == "error" ?
                <Card className="w-75">
                    <ErrorAlert title="Couldn't load character profile" description={character.description} code={character.code}/>
                    <Card.Body>
                        <Button onClick={navigateBack}>Back</Button> 
                    </Card.Body>
                </Card>
                :
                <Profile character={character.data} onBack={navigateBack}/>
        }
    </Container>
}

function Profile({character, onBack}:{character:Character, onBack?:()=>void}) {
    return <Card>
        <Card.Img id="profileImage" src={character.image}/>
        <Card.Body>
            <Card.Title>{character.name}</Card.Title>
            <Card.Subtitle>{character.species}, {character.gender}</Card.Subtitle>
            <div className="my-3">
                <InfoEntry title="Status" text={character.status}/>
                <InfoEntry title="Type" text={character.type}/>
                <InfoEntry title="Origin location" text={character.origin.name}/>
                <InfoEntry title="Last known location" text={character.location.name}/>
                <InfoEntry title="Episodes" text={gatherEpisodeIds(character)}/>
                
            </div>
            <Button className="profile-back" onClick={onBack}>Back</Button> 
        </Card.Body>
    </Card>
}

function InfoEntry({title, text}:{title:string, text:string}) {
    if (!text)
        return <></>
    return <div className="my-2">
        <div className="fw-bold">{title}</div>
        {text}
    </div>
}

function gatherEpisodeIds(character:Character) {
    const episodeRe = /episode\/(\d+)$/i
    return character.episode.map(e => e.match(episodeRe)?.[1]).join(", ")
}