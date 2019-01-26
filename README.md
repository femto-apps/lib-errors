### Errors

An opinionated library to help you handle errors in APIs.

#### Usage

An index file:

```javascript
// require the module
const Errors = require('@femto-host/errors')

// initialise errors
const errors = new Errors('path/to/errors.json')

// add the errors function to your express `res` object.
app.use('/api', (req, res, next) => {
    errors(res)
    next()
})

// register errors.
app.get('/api/test', (req, res) => {
    res.error('ERRNOFOUND', { file: 'test.txt' })
})
```

An error file:

```json
{
    "ERRNOTFOUND": {
        "msg": "File {file} was not found.",
        "code": 404
    }
}
```

