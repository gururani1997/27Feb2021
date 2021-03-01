'use strict';
var async = require('async');

var USERS = {
    ADMINS: [{
        'email': 'admin@otssolutions.com',
        'emailVerified': true,
        'password': '1234',
        "fullName": "Default Admin",
        "username": "Default Admin",
        "role": "admin"
    }],

    USER: [
        {
            'email': 'user1@yopmail.com',
            'emailVerified': true,
            'password': '1234',
            "firstName": "Default",
            "lastName": "User",
            "username": "Default User"
        },
    ],

};
var product = {
    product: [{
        "name": "asaaaaaaaaaaa",
        "details": "mjngf",
        "categoryId": "Default",
        "categoryName": "Default",
    }],

}
module.exports = function (app) {
    app.models.user.create(USERS.ADMINS, (err, result) => {
        if (err) console.log("error ");
        console.log("done model creation.")
    });
    app.models.product.findOne({ where: { name: 'asaaaaaaaaaaa' } }, function (err, ress) {
        if (err || !ress) {
            app.models.product.create(product.product, (err, result) => {
                if (err) console.log("error ");
                console.log("done model creation.")
            })
        }
        else {
            console.log("already exist default product")
        }
    })

}