/**
 * Created by Peter Sbarski
 * Last Updated: 28/03/2016
 */
'use strict';

var request = require('request');
var env = require('./config');

exports.handler = function(event, context, callback){
    if (!event.authToken) {
    	callback('Could not find authToken');
    	return;
    }

    var token = event.authToken.split(' ')[1];
    var firstName = event.first_name;
    var lastName = event.last_name;
    var email = event.email;
    var userId = event.user_id;

    var body = {
        'id_token': token
    };

    var options = {
        url: 'https://' +  env.AUTH0_DOMAIN + '/tokeninfo',
        method: 'POST',
        json: true,
        body: body
    };

    request(options, function(error, response, body){
        if (!error && response.statusCode === 200) {
            console.log(firstName, lastName, email, userId);
            callback(null, body);
        } else {
            callback(error);
        }
    });
};
