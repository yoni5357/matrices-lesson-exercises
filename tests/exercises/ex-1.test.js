const client = require( './lib/client.class' )
const exec = require( 'child_process' ).exec
const _ = require( 'lodash' )

function isArraysEqual( x, y ) {
    return _( x ).xorWith( y, _.isEqual ).isEmpty()
}

var server
beforeAll( async done => {
    server = exec( 'node server', { async: true } ).pid
    done()
} )

// Should we check all?
describe( 'Exercise 2', () => {
    it( 'Should return 1200', async done => {
        const results = await client.checkItem( 'couch' )
        const checkPrice = await client.checkPrice( 'couch' )

        expect( checkPrice.price ).toBe( results.price )
        done()
    } )

    it( 'Should return null', async done => {
        const checkPrice = await client.checkPrice( 'undefined-item' )

        expect( checkPrice.price ).toBeNull()

        done()
    } )
} )

describe( 'Exercise 4', () => {
    it( 'Should return 15', async done => {
        const itemName = 'chair'
        const chair = await client.checkItem( itemName )
        const quantity = chair.inventory

        const response = await client.buyItem( itemName )
        expect( response.inventory ).toBe( quantity - 1 )

        done()
    } )

    it( 'Should return 0', async done => {
        const itemName = 'couch'
        const chair = await client.checkItem( itemName )
        const quantity = chair.inventory

        const response = await client.buyItem( itemName )
        expect( response.inventory ).toBe( quantity - 1 )

        done()
    } )
} )

describe( 'Exercise 6', () => {
    it( 'Should be the same store of calling with false admin param', async ( done ) => {
        const originalStore = await client.fetchStore()
        let store = await client.sale( false )

        expect( isArraysEqual( store, originalStore ) ).toBeTruthy()
        done()
    } )

    it( 'Should change the prices in the store when sending admin param to be true', async ( done ) => {
        const originalStore = await client.fetchStore()
        let store = await client.sale( true )

        // Make the logic of reducing the prices
        for ( let i = 0; i < originalStore.length; i++ ) {
            if ( originalStore[ i ].inventory > 10 ) {
                originalStore[ i ].price = originalStore[ i ].price / 2
            }
        }
        expect( isArraysEqual( store, originalStore ) ).toBeTruthy()
        done()
    } )
} )

afterAll( done => {
    done()
} )
