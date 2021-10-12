const { verifyToken } = _lib('jwt')


module.exports = async (req, res, next) => {
    const { authorization } = req.headers
    if (authorization) {
        try {
            const checkId = await verifyToken(authorization)
            if (checkId && checkId.email) {
                next()
            } else {
                res.status(401).json({
                    status: 'Unauthorized',
                    statusCode: 401,
                    type:"invalid_token",
                    message:"Invalid token"
                }).end()
            }
        } catch (error) {
            res.status(401).json({
                status: 'Unauthorized',
                statusCode: 401,
                payload: {
                    error
                }
            }).end()
        }
    } else {
        res.status(401).json({
            status: 'Unauthorized',
            statusCode: 401,
            payload: {
                error: 'undefined token'
            }
        }).end()
    }
}