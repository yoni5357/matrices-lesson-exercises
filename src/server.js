const express = require( 'express' )
const app = express()
const port = 4000

function fibn(a, s){let b=0;for(const c of s){if(c.name===a)return b;b++}return-1}

const store = [
    { name: 'table', inventory: 3, price: 800 },
    { name: 'chair', inventory: 16, price: 120 },
    { name: 'couch', inventory: 1, price: 1200 },
    { name: 'picture frame', inventory: 31, price: 70 }
]

app.get( '/store', ( request, response ) => response.send( store ) )

app.get( '/item/:name', ( request, response ) => {
    const index = fibn( request.params.name, store )
    response.send( store[ index ] )
} )

// Start your routes from here :)


// End routes here

app.listen( port, () => console.log( `Running server on port ${ port }` ) )
