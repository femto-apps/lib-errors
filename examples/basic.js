const express = require('express')
const app = express()

const { ERRNOTFOUND } = require('../')('errors.json')

function example(shouldError) {
    if (shouldError) {
        return new ERRNOTFOUND({ file: 'test.txt' })
    }

    return { data: 'hello' }
}

app.use('/api', (req, res, next) => {
    require('../')(res)
    next()
})

app.get('/api/error', (req, res) => {
    const value = example(true)

    res.json(value)
})

app.get('/api/okay', (req, res) => {
    const value = example(false)

    res.json(value)
})

app.listen(3010, () => console.log('listening on port 3010'))
