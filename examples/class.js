const { ERRNOTFOUND } = require('../')('errors.json')

function example() {
    throw new ERRNOTFOUND({ file: 'test.txt' })
}