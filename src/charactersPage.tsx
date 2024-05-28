import React, { ReactElement, useEffect } from "react";
import Container from "react-bootstrap/Container"
import { CharactersResponse, Result, getCharacters } from "./rickandmortyapi";
import CharactersTable from "./characters";
import InputGroup from "react-bootstrap/InputGroup";
import BForm from "react-bootstrap/Form";
import Pager from "./pager";
import { Form, LoaderFunctionArgs, useLoaderData, useNavigate, useSubmit, ScrollRestoration } from "react-router-dom";
import { ErrorAlert } from "./errorComponents";

interface CharacterLoaderResult {
    characterRes: Result<CharactersResponse>
    nameFilter: string | null
}

export async function loader({ request }:LoaderFunctionArgs):Promise<CharacterLoaderResult> {
    const searchParams = new URL(request.url).searchParams;
    const page = searchParams.get("page");
    const nameFilter = searchParams.get("nameFilter")
    const characterRes = await getCharacters({ 
        page: page ?? 1, 
        nameFilter
    })
    return {
        characterRes,
        nameFilter
    }
}

export default function CharactersPage() {
    const loaderRes = useLoaderData() as CharacterLoaderResult
    const characterRes = loaderRes.characterRes
    const navigate = useNavigate()
    const submit = useSubmit();

    useEffect(() => { // this effect is used to keep the nameFilter input in sync with the URL we're currently showing
                      // further explanation: https://reactrouter.com/en/main/start/tutorial#synchronizing-urls-to-form-state
        const nameFilterInput = document.querySelector("[name=nameFilter]") as HTMLInputElement|null
        if (nameFilterInput) 
            nameFilterInput.value = loaderRes.nameFilter ?? "";
    }, [loaderRes.nameFilter]);

    const page = characterRes.kind == "success" ? characterRes.data.info.currentPage : 0
    const numPages = characterRes.kind == "success" ? characterRes.data.info.pages : 0
    
    let characterDetails:ReactElement = <></>

    if (characterRes?.kind == "success") {
        characterDetails = <CharactersTable className="mb-4" characters={characterRes.data.results}></CharactersTable>
    } else if (characterRes) characterDetails = <ErrorAlert description={characterRes.description} code={characterRes.code} title=""></ErrorAlert>

    const onPageChanged = (p:number) => {
        let target = "?"    
        if (loaderRes.nameFilter != null)
            target += `nameFilter=${encodeURIComponent(loaderRes.nameFilter)}&`
        target += `page=${p}`
        navigate(target)
    } 

    const paging = numPages > 1 ? 
        <Pager page={page} numPages={numPages} onPageChanged={ onPageChanged } />
        : undefined

    return (
        <Container className="p-3">
            <ScrollRestoration getKey={(location) => {
                return location.pathname + location.search
            }} />
            <h2 className="mb-4">Rick&Morty characters</h2>
            <Form className="mb-4">
                <InputGroup>
                    <InputGroup.Text>Search by name</InputGroup.Text>
                    <BForm.Control name="nameFilter" 
                        type="text" defaultValue={loaderRes.nameFilter ?? ""} 
                        onChange={ 
                            event => {
                                const isFirstSearch = loaderRes.nameFilter == null
                                submit(event.currentTarget.form, {replace: !isFirstSearch}) // avoid spamming history
                            }
                        }
                    />
                    <InputGroup.Text><span className="material-symbols-outlined">search</span></InputGroup.Text>
                </InputGroup>
            </Form>
            {paging}
            {characterDetails}
            {paging}
    </Container>)
}