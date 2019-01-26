const format = require('string-template')
const path = require('path')
const caller = require('caller')
const fs = require('fs')

module.exports = function(arg) {
    if (typeof arg === 'string') {
        const errorsPath = path.resolve(path.dirname(caller()), arg)
        const errorsText = fs.readFileSync(errorsPath, 'utf8')
        const errorsData = JSON.parse(errorsText)

        let errors = {} 
        for (let errorCode in errorsData) {
            const error = errorsData[errorCode]

            let Errors = class {
                constructor(context) {
                    this.error = {
                        code: error.code,
                        msg: format(error.msg, context),
                        context
                    }
                }
            }

            Object.defineProperty(Errors, 'name', { value: errorCode })
            Object.defineProperty(Errors.prototype, 'isError', { value: true, enumerable: false })
            errors[errorCode] = Errors
        }

        return errors
    }

    if (typeof arg === 'object') {
        const _json = arg.json
        const _status = arg.status
        arg.json = function(data) {
            
            if (data.isError) {
                _status.call(this, data.error.code)
                return _json.call(this, data)
            }

            _json.call(this, data)
        }
    }
}