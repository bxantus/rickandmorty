import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert";

export function ErrorPage() {
    const error = useRouteError() as any;

    return (
        <Container className="p-3">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/">Go Home</Link>
        </Container>
    );
}

const errorTexts = {
    404: "Not found"
}

export function ErrorAlert({title, description, code}:{ title?:string, description:string, code?:number}) {
    title = title ?? "Sorry, an unexpected error has occurred."
    if (!description)
        description = errorTexts[code] ?? "Unknown error"
    
    return <Alert variant="warning">
        {
            title ? <p>{title}</p> : undefined
        }
        <p><i>{description}</i></p>
        <Link to="/">Go Home</Link>
    </Alert>
}