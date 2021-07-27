const request = require('postman-request')



const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3c4c9f38dd11d809902016e06d0dedfe&query=' + latitude + ',' +
        longitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            let current = body.current
            callback(undefined,
                'It is currently ' + current.temperature + ' degrees out. It feels like ' + current.feelslike + '.'
            )
        }
    })
}

module.exports = forecast