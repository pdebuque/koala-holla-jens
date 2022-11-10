
[x] set up database: id, name, gender, age, ready_to_transfer, notes
[] add existing inventory

html
[x] create form


js
[] link form to database (POST)
[] client: set up ajax calls
[] server: set up all http requests

1 person: database
1 person: client
1 person: server

## stretch goals

1. delete koalas from the database
    [] html infrastructure: include delete button in render
    [] client-side delete request using data-id as a param
    [] server-side delete handling 

2. confirmation dialog before deleting

3. toggle koalas between ready and not ready
    [] html infrastructure: buttons in render
    [] client-side: put request
    [] server-side put handling

4. form validation, stylings, and README.md

5. client-side filtering with a text box
    [] add input to html
    [] client-side: .on('keyup',filterResults)

6. Edit information for existing koalas