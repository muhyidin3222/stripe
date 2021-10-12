'use strict';

module.exports = async (req, res, next) => {

    const errorFunction = (errorMessage) => {
        if (errorMessage && errorMessage.stack)
            return {
                message: errorMessage.message,
                stack: errorMessage.stack.split("\n"),
            }
        return errorMessage
    }
    res.success = (data, statusCode = 200) => {
        res.status(statusCode).json({
            status: 'success',
            statusCode: statusCode,
            payload: data || {}
        });
    }

    res.error = (message, statusCode = 500) => {
        console.log(message)
        res.status(statusCode).json({
            status: 'error',
            statusCode,
            payload: {
                error: errorFunction(message)
            }
        })
    }

    res.errorClient = (message, statusCode = 400) => {
        res.status(statusCode).json({
            status: 'error',
            statusCode,
            payload: {
                error: errorFunction(message)
            }
        })
        console.error(message)
    }

    res.notfound = (message) => {
        res.status(404).json({
            status: 'error',
            statusCode: 404,
            payload: {
                error: errorFunction(message)
            }
        });
        console.error(message)
    }

    res.notAccess = (message) => {
        res.status(401).json({
            status: 'Unauthorized',
            statusCode: 401,
            payload: {
                error: errorFunction("Token Expired")
            }
        });
        console.error(message)
    }

    res.notAccessToken = (message) => {
        res.status(401).json({
            status: 'Unauthorized',
            statusCode: 401,
            payload: {
                error: errorFunction(message)
            }
        });
        console.error(message)
    }

    res.notAccess1 = (message) => {
        res.status(403).json({
            status: 'Forbidden',
            statusCode: 403,
            payload: {
                error: errorFunction(message)
            }
        });
        console.error(message)
    }

    next();
}