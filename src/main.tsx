import React from "react";
import { createRoot } from "react-dom/client";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"


function Root() {
    return <Container className="p-3">Hello Rick&Morty <Button>Ok</Button></Container>
}

window.onload = () => {
    const root = createRoot(document.getElementById("root")!);
    root.render(
        <Root></Root>
    );
}
