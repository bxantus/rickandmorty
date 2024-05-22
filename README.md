## Displaying Rick and Morty characters

1. Create a Single Page App that will have two pages: Home and Profile
2. Using the Rick & Morty API’s Character endpoint (https://rickandmortyapi.com/), create a
table on the Home page with the following columns: Avatar, Name, Species, Status.
Generate data in the table based on the received response.
3. When the user clicks on one of the names, navigate to the Profile page that will show
info about the character. Data should come from the API endpoint.
4. The character profile page should have a Back button that will navigate back to the 
table.
5. Create an input field on the Home page to search among character names. It should
have an onChange event, and you should only show rows that contain the searched
string.

### Technical notes

Uses:
- react
- react bootstrap as UI lib
- react router for routing
- esbuild for bundling

### Development setup 

#### From the command line

After installing dependencies (`npm install`) you can use the following

```bash
# compile with tsc, for typescript compilation
npm run compile
# Testing and debugging: bundle the scripts and serve using esbuild
npm run bundle-serve
# Packaging and publishing: will check sources, bundle minify and upload to gh-pages branch
npm run publish
```

While developing the page is served at: [localhost:8000](localhost:8000)

#### Using vscode

* Install the esbuild Problem Matchers extension (see `connor4312.esbuild-problem-matchers`)
* The default build task will launch both typescript compiler and esbuild in watch mode (`Ctrl + Shift + B`)
* There's a luanch configuration for Firefox debugger (see `firefox-devtools.vscode-firefox-debug`), this will launch the build task if not
 yet launched 
