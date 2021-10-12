"use strict"

const { eventsGetId, eventsList } = _config('stripe/events')

exports.eventsList = async (req, res, next) => {
    try {
        const eventsListRes = await eventsList(req.body)
        res.success(eventsListRes)
    } catch (error) {
        res.error(error)
    }
}
exports.eventsGetId = async (req, res, next) => {
    try {
        const eventsGetIdRes = await eventsGetId(req.body)
        res.success(eventsGetIdRes)
    } catch (error) {
        res.error(error)
    }
}