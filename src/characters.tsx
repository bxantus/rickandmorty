import React from "react";
import { Character } from "./rickandmortyapi";
import Table from "react-bootstrap/Table"
import { Link } from "react-router-dom";

export default function CharactersTable({characters}:{characters:Character[]}) {
    return <Table striped hover>
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
                <td><img className="img-fluid" src={character.image}></img></td>
                <td><Link to={`characters/${character.id}`}>{character.name}</Link></td>
                <td>{character.species}</td>
                <td>{character.status}</td>
            </tr>)}
        </tbody>
    </Table>
}