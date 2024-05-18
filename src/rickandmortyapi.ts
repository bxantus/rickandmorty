export interface Err {
    kind: "error"
    description: string
    code?:number
}

export interface Success<T> {
    kind: "success"
    data: T
}

export type Result<T> = Err | Success<T>

export interface Character {
    id: number
    name: string
    status: 'Alive'| 'Dead' | 'unknown'
    species: string,
    type: string,
    gender: 'Female'| 'Male'| 'Genderless' | 'unknown'
    /** Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars. */
    image:string
    /** Link to the character's own URL endpoint. */
    url: string
}

export interface CharactersResponse {
    info: {
        count: number
        currentPage: number
        pages: number
        next?: string
        prev?: string
    }
    results: Character[]
}

export async function getCharacters({page, nameFilter}:{page:number|string, nameFilter?: string|null}):Promise<Result<CharactersResponse>> {
    try {
        if (typeof page == "string")
            page = Number.parseInt(page) // keep page as a number. string type is allowed for easy usage
        let url = `https://rickandmortyapi.com/api/character?page=${page}`
        if (nameFilter)
            url += `&name=${nameFilter}` // todo: build real URL (values may have to be URL escaped here)
        const res = await fetch(url)
        if (res.status != 200)
            return { kind: "error", description: res.statusText, code: res.status }
        const characters = await res.json() as CharactersResponse
        characters.info.currentPage = page
        return { kind: "success", data: characters } 
    } catch (err) {
        return { kind: "error", description: `Fetch failed ${err.toString()}` }
    }
} 

export async function getCharacter(id:string|number):Promise<Result<Character>> {
    try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        if (res.status != 200)
            return { kind: "error", description: res.statusText, code: res.status }
        const character = await res.json() as Character
        return { kind: "success", data: character } 
    } catch (err) {
        return { kind: "error", description: `Fetch failed ${err.toString()}` }
    }
} 