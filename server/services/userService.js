const bcrypt = require('bcrypt');

require('dotenv')
    .config();

const {
    User,
    Basket
} = require('../models/index');

class UserService {

    async registration(pool) {
        const hashPassword = await bcrypt.hash(pool.password, Number(process.env.PASSWORD_SALT));
        const user = await User.create({ password: hashPassword, email: pool.email });
        await Basket.create({ user_id: user.dataValues.id });
        return user;
    }

}

module.exports = new UserService();