const UserController = require("../controllers/user.controller");
const BASE_URL = process.env.BASE_URL;

module.exports = (app) => {
    app.get(`${BASE_URL}/users`, UserController.getAll);
    app.get(`${BASE_URL}/users/:id`, UserController.getOne);
    app.post(`${BASE_URL}/users/add`, UserController.create);
    app.put(`${BASE_URL}/users/:id`, UserController.update);
    app.delete(`${BASE_URL}/users/:id`, UserController.delete);
    app.post(`${BASE_URL}/users/login`, UserController.login);
}