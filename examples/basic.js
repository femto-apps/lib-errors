const Errors = require('../')('errors.json')

function test() {
    const error = Errors('ERR_CONSUMER_SAVE', { file: 'test.txt' })

    console.log(error instanceof Error)

    throw Errors('ERR_CONSUMER_SAVE', { file: 'test.txt' })
}

test()