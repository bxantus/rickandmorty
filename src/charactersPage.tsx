import React, { ReactElement, useState } from "react";
import Container from "react-bootstrap/Container"
import { CharactersResponse, Result, getCharacters } from "./rickandmortyapi";
import CharactersTable from "./characters";
import Alert from "react-bootstrap/Alert";
import Pager from "./pager";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";

export function loader({ request }:LoaderFunctionArgs) {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    return getCharacters( { page: page ?? 1} )
}


export default function CharactersPage() {
    const characterRes = useLoaderData() as Result<CharactersResponse>
    const navigate = useNavigate()

    const page = characterRes.kind == "success" ? characterRes.data.info.currentPage : 0
    const numPages = characterRes.kind == "success" ? characterRes.data.info.pages : 0
    
    let characterDetails:ReactElement = <></>

    if (characterRes?.kind == "success") {
        characterDetails = <CharactersTable characters={characterRes.data.results}></CharactersTable>
    } else if (characterRes) characterDetails = <Alert variant="error">Error: {characterRes.description}</Alert>

    return <Container className="p-3">
                {numPages > 0 ? <Pager page={page} numPages={numPages} onPageChanged={ p=> navigate(`?page=${p}`) } ></Pager> : undefined}
                {characterDetails}
    </Container>
}