const caller = require('caller')
const fs = require('fs')
const format = require('string-template')
const path = require('path')

class Errors {
    constructor(errorFile) {
        const errors = JSON.parse(fs.readFileSync(path.resolve(path.dirname(caller()), errorFile), 'utf8'))

        return function(res) {
            res.error = function(code, context) {
                const error = errors[code]

                res.status(error.code).json({ error: { code, msg: format(error.msg, context), context }})
            }
        }
    }
}

module.exports = Errors