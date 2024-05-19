import React, { ReactElement } from "react";
import Pagination from "react-bootstrap/Pagination"

interface PagerProps {
    page:number  // page numbering starts from 1, including numPages
    numPages:number
    maxPagesToDisplay?:number // will default to 5
    onPageChanged?:(page:number) => void
}

export default function Pager({page, numPages, onPageChanged, maxPagesToDisplay}:PagerProps) {
    const pagesToDisplay = Math.min(numPages, maxPagesToDisplay ?? 5)
    
    let firstPage = page - (pagesToDisplay >> 1) // using integer division
    if (page < pagesToDisplay/2)  //we're at the beginning
        firstPage = 1
    else if (page > numPages - pagesToDisplay/2)  // at the end
        firstPage = numPages - pagesToDisplay + 1
    const items:ReactElement[] = []
    
    // changePageTo returns a function, which when called will call onPageChanged
    const changePageTo = (targetPage:number) =>  () => onPageChanged?.(targetPage)

    for (let p = firstPage; p < firstPage + pagesToDisplay; ++p) 
        items.push(<Pagination.Item  key={p} active={page == p} onClick={ changePageTo(p) } >{p}</Pagination.Item>)

    return <Pagination className="justify-content-center">
        <Pagination.First disabled={page == 1} onClick={changePageTo(1)}/>
        <Pagination.Prev disabled={page == 1} onClick={ page > 1 ? changePageTo(page - 1) : undefined}/>
        {items}
        <Pagination.Next disabled={page == numPages} onClick={ page < numPages ? changePageTo(page + 1) : undefined}/>
        <Pagination.Last disabled={page == numPages} onClick={changePageTo(numPages)}/>
    </Pagination>
}