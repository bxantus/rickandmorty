import React from "react";
import { Character } from "./rickandmortyapi";
import Table from "react-bootstrap/Table"
import { Link } from "react-router-dom";

export default function CharactersTable({characters, className}:{characters:Character[], className?:string}) {
    return <Table striped hover className={className}>
        <thead>
            <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Species</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {characters.map( character => <tr className="align-middle" key={character.id}>
                <td><Link to={`profile/${character.id}`}><img className="img-fluid avatar" src={character.image}></img></Link></td>
                <td><Link to={`profile/${character.id}`}>{character.name}</Link></td>
                <td>{character.species}</td>
                <td>{character.status}</td>
            </tr>)}
        </tbody>
    </Table>
}