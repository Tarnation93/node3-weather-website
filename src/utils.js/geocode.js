const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoidGlueXJpY2siLCJhIjoiY2szZXZobWFxMDJiYzNmcDl4cXNnM213aSJ9.n1f_HO-ttbzYluJbC3PaCw'
    request({ url:url, json: true }, (error, {body}) => {
        if (error) {
            console.log('aaaaa')
            callback('cannot connect')
        }
        else if (body.features.length === 0) {
            console.log('bbbbb')
            callback('invalid input')
        }
        else {    
            console.log('cccccc')
           callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })

}





module.exports = geocode