const express = require('express')
const app = express()

const Errors = require('../')
const errors = new Errors('errors.json')

app.use('/api', (req, res, next) => {
    errors(res)
    
    next()
})

app.get('/api/test', (req, res) => {
    res.error('ERRNOTFOUND', { file: 'test.txt' })
})

app.listen(3010, () => console.log('listening on port 3000'))