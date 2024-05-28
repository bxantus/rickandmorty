import React from "react";
import { Character } from "./rickandmortyapi";
import { Link } from "react-router-dom";

export default function CharactersTable({characters, className}:{characters:Character[], className?:string}) {
    return <div className={"characters " + className}>
        <div className="header-row">
            <span className="header">Avatar</span>
            <span className="header">Name</span>
            <span className="header">Species</span>
            <span className="header">Status</span>
        </div>
        {characters.map( character => <div className="table-row">
            <Link to={`profile/${character.id}`}><img className="img-fluid avatar" src={character.image}></img></Link>
            <Link to={`profile/${character.id}`}>{character.name}</Link>
            <span>{character.species}</span>
            <span>{character.status}</span>
        </div>)}
    </div>
}