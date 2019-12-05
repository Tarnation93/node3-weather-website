const request = require('request')

const forecast = (latitude, longitude , callback) => {
    const url = `https://api.darksky.net/forecast/489e7dd1b76524714a80605ce605f1e0/${latitude},${longitude}?units=si&&lang=sr`

    request({ url, json: true }, (error, {body}) => {
        if (error) callback('unable to find weather service');
        else if (body.error) {
            callback('unable to find location')
        }
        else {
            callback(undefined, `${body.daily.data[0].summary}. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}.  it is currently ${body.currently.temperature} degrees, and there is a ${body.currently.precipProbability} chance to rain`)

        }
    })
}


module.exports = forecast