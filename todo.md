
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
    [x] html infrastructure: include delete button in render
    [x] client-side delete request using data-id as a param
    [x] server-side delete handling 

2. confirmation dialog before deleting
    [x] all done

3. toggle koalas between ready and not ready
    [x] html infrastructure: buttons in render
    [x] client-side: put request
    [x] server-side put handling

4. form validation, stylings, and README.md
    [] form validation
        [] regex
    [x] stylings
    [x] readme

5. client-side filtering with a text box
    [x] add input to html
    [x] client-side: .on('keyup',filterResults)

6. Edit information for existing koalas