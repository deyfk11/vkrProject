'use strict'

module.exports = (app) => {
    const indexController = require('./../controller/indexController')
    const usersController = require('./../controller/UserController')
    const officeController = require('./../controller/OfficeController')

    app.route('/').get(indexController.index)
    app.route('/api/users').get(usersController.getAllUsers)
    app.route('/api/users/add').post(usersController.addUser)
    app.route('/api/users/signin').post(usersController.signIn)
    app.route('/api/offices').get(officeController.getAllOffices)
    app.route('/api/users/changeActiveUser').put(usersController.changeActiveUser)
    app.route('/api/users/changeUserRole').put(usersController.changeUserRole)
}