const format = require('string-template')
const path = require('path')
const caller = require('caller')
const fs = require('fs')

class CustomError extends Error {
    constructor(code, message, context) {
        super()
        
        this.name = code
        this.message = message
        this.context = context
    }
}

function init(filepath) {
    const errorsPath = path.resolve(path.dirname(caller()), filepath)
    const errorsText = fs.readFileSync(errorsPath, 'utf8')
    const errorsData = JSON.parse(errorsText)

    return function(code, context) {
        const error = errorsData[code]
        const message = format(error.msg, context)

        const customError = new CustomError(code, message, context)
        customError.stack = customError.stack.split('\n')
        customError.stack.splice(1, 1)
        customError.stack = customError.stack.join('\n')

        return customError
    }
}

module.exports = init