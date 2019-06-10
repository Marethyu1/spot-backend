const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.colorize(),
  ),

  // defaultMeta: { service: 'spot-backend' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    // new transports.File({
    //   filename: 'quick-start-error.log',
    //   level: 'error',
    //   humanReadableUnhandledException: true
    // }),
    // new transports.File({ filename: 'quick-start-combined.log' }),

    // Log these bad boys to file
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.splat(),
        format.errors({ stack: true }),
        // format.json()

        // myFormat
      )
      // handleExceptions: true
    })
  ]
})


module.exports = logger


// module.exports = function (name) {
//   return {
//     info: (first, ...args) => {
//       logger.info(`[${name}] ${first}`, args)
//     },
//
//     error: logger.error
//
//     // error: (first, ...args) => {
//     //   logger.error(`[${name}] ${first}\n\t`, ...args)
//     // }
//   }
// }
