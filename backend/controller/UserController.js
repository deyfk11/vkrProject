'use strict'

const response = require('./../response')
const db = require('./../settings/db')
const camelcaseKeysDeep = require('camelcase-keys-deep');

exports.getAllUsers = (req, res) => {

    db.query("SELECT `ID`, `RoleId`, `Email`, `FirstName`, `LastName`, `OfficeID`, `Birthdate`, `Active`  FROM `users`", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res )
        } else {
            response.status(200, camelcaseKeysDeep(rows), res)
        }
    })
}
exports.addUser = (req, res) => {
    const body = req.body
    console.log(body)
    db.query("SELECT id FROM users ORDER BY id DESC LIMIT 1", (error, rows) => {
        if (error) {
            response.status(400, error, res )
        } else {
            const sql = `INSERT INTO users (ID, RoleId, Email, Password, FirstName, LastName, OfficeID, Birthdate, Active) 
                values ("${rows[0].id + 1}", "2", "${body.email}", "${body.password}", 
                "${body.firstName}", "${body.lastName}","${body.officeID}", "${body.birthdate}", "1")`;
            db.query(sql, (error, results) => {
                if (error) {
                    response.status(400, error, res )
                } else {
                    response.status(200, body, res)
                }
            })
        }
    })
}
exports.signIn = (req, res) => {
    const body = req.body
    db.query("SELECT ID, RoleId, Email, Password FROM users WHERE Email = '" + body.email + "'", (error, rows) => {
        if (error) {
            response.status(400, error, res)
        }
        const row = JSON.parse(JSON.stringify(rows))
        console.log(row)
        if (rows.length <= 0) {
            response.status(404, 'Пользователь не найден', res)
        } else if (row[0].Password !== body.password) {
            response.status(404, 'Введен неправильный логин или пароль', res)
        }
        else {
            response.status(200, {message: "Успешная авторизация", role: row[0].RoleId}, res)
        }
    })
}

exports.changeActiveUser = (req, res) => {
    const body = req.body
    db.query("UPDATE users SET Active = '" + body.active + "'  WHERE ID = '" + body.id + "'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res )
        } else {
            response.status(200, "Статус изменен", res)
        }
    })

}