'use strict'

const response = require('../response')
const db = require('../settings/db')
const camelcaseKeysDeep = require('camelcase-keys-deep');

exports.getAllOffices = (req, res) => {

    db.query("SELECT Title, ID, CountryID FROM `offices`", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res )
        } else {
            response.status(200, camelcaseKeysDeep(rows), res)
        }
    })
}