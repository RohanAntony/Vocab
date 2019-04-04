const { createLogger, format, transports} = require('winston')
const fs = require('fs')
const configJson = JSON.parse(fs.readFileSync('./config.json'))

let logJson = configJson.logger ? configJson.logger : {}
let logFile = logJson.logFile ? logJson.logFile : "temp.log"
let logLevel = logJson.logLevel ? logJson.logLevel : "info"

const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`
})

const logger = new createLogger({
    level: logLevel,
    format: format.combine(
        format.timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({
            filename: logFile,
            timestamp: true
        })
    ]
})

module.exports = logger;