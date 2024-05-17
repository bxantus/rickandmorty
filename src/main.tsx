import React from "react";
import { createRoot } from "react-dom/client";


function Root() {
    return <div>Hello Rick&Morty</div>
}

window.onload = () => {
    const root = createRoot(document.getElementById("root")!);
    root.render(
        <Root></Root>
    );
}
