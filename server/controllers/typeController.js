const { Type } = require('../models/index');

const ApiError = require('../errors/ApiError');
const helperService = require('../services/helperService');

class TypeController {
    async create(req, res, next) {
        try {
            const itContains = helperService.itContains(req.body, ['name', 'description']);
            if (!itContains.result)
                return next(ApiError.badRequest(`Параметр ${itContains.field} не найден`));

            const { name, description } = req.body;

            const type = await Type.create({ name, description });
            res.status(200).json(type);
        } catch(e) {
            return next(new Error());
        }
    }

    async get(req, res, next) {
        try {
            const id = req.query?.id;
            let type = (id) ? await Type.findOne({ where: { id } }) : await Type.findAll();

            if (!type)
                return next(ApiError.badRequest(`Обьeкт не найден`));
            res.status(200).json(type);
        } catch(e) {
            return next(new Error());
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.body?.id;
            if (!id)
                return next(ApiError.badRequest('Не найдено поле id'))

            const candidate = await Type.findOne({ where: { id } });
            if (candidate) {
                await Type.destroy({ where: {id} });
                res.status(200).json({ message: 'Успешно удален' });
            }
            else
                return next(ApiError.badRequest(`Обьeкт не найден`));
        } catch(e) {
            return next(new Error());
        }
    }
}

module.exports = new TypeController();