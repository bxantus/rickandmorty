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
        pages: number
        next?: string
        prev?: string
    }
    results: Character[]
}

export async function getCharacters():Promise<Result<CharactersResponse>> {
    try {
        const res = await fetch("https://rickandmortyapi.com/api/character")
        if (res.status != 200)
            return { kind: "error", description: res.statusText, code: res.status }
        const characters = await res.json() as CharactersResponse
        return { kind: "success", data: characters } 
    } catch (err) {
        return { kind: "error", description: `Fetch failed ${err.toString()}` }
    }
} 