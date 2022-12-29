const { User } = require('../models/index');

const ApiError = require('../errors/ApiError')

const userService = require('../services/userService');
const helperService = require("../services/helperService");

class UserController {
    async login(req, res) {
        res.json({
            message: 'login'
        });
    }

    async registration(req, res, next) {
        const pool = req.body;

        const itContains = helperService.itContains(pool, ['email', 'password']);
        if (!itContains.result)
            return next(ApiError.badRequest(`Параметр ${itContains.field} не найден`));

        const candidate = await User.findOne({ where: { email: pool.email } });
        if (candidate)
            return next(ApiError.badRequest(`Пользователь с таким email уже создан`));

        const user = await userService.registration(pool);

        res.json({
            user
        });
    }

    async auth(req, res) {
        res.json({
            message: 'auth'
        });
    }
}

module.exports = new UserController();