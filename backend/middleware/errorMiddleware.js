//to enable the express error handler and overwrite default handler

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack //only shows stack data if in DEV mode
    })
}

module.exports = {
    errorHandler
}