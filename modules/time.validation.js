const moment = require('moment-timezone');

/**
 * If the timestamp is within 30 seconds of the current
 * time, return true. Otherwise, return false.
 * 
 * Input '2020-07-01T16:03:18.021Z' -> output: depends on current time (true or false)
 * 
 * @param {String} timestamp
 * @returns {Boolean} whether the timestamp is within 30 seconds of now
 */
function closeToNow(timestamp) {
    if (!moment(timestamp).isValid()) return 'invalid timestamp'
    return moment(timestamp).isBetween(moment().subtract(30, 'seconds'), moment().add(30, 'seconds'))
}

/**
 * Returns the previous days date if before 12pm CST or the
 * date of the timestamp if after 12pm CST. 
 * 
 * Input: '2020-07-01T16:03:18.021Z' -> output: '2020-06-30'
 * Input: '2020-07-01T17:03:18.021Z' -> output: '2020-07-01'
 * Input: '2020-07-01T12:03:18.021-05:00' -> output: '2020-07-01'
 * 
 * @param {String} timestamp 
 * @returns {String} calulated date in the format 'YYYY-MM-DD'
 */
function closestDate(timestamp) {
    if (!moment(timestamp).isValid()) return 'invalid timestamp'
    if (moment.tz(timestamp, 'US/Central').format('H') < 12)
    {
        return moment(timestamp).subtract(1, 'day').format('YYYY-MM-DD')
    }
    return moment(timestamp).format('YYYY-MM-DD')
}

/**
 * Takes in a timestamp and timezone, returns a string formatted for
 * that timezone. https://momentjs.com/timezone/
 *
 * Input: '2020-07-01T16:03:18.021Z', 'US/Central' -> output: 'July 1st, 2020 at 11:03 am'
 *
 * @param {String} timestamp
 * @returns {String} calulated date in the format 'MMMM Do, YYYY [at] h:mm a'
 */
function formatTimestamp(timestamp, timezone) {
    if (!moment(timestamp).isValid()) return 'invalid timestamp'
    if (!moment.tz.zone(timezone)) return 'invalid timezone'
    return moment.tz(timestamp, timezone).format('MMMM Do, YYYY [at] h:mm a')
}

module.exports = {
    closeToNow,
    closestDate,
    formatTimestamp,
}