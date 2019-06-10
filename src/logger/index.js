const logger = require('./logger')

function method(method_name) {
  return module_name => (arg, ...args) => {
    logger[method_name](`[${module_name}] ${arg}`, ...args)
  }
}

const INFO = 'info'
const ERROR = 'error'


module.exports = name => ({
  info: method(INFO)(name),
  error: method(ERROR)(name)
})
