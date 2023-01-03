const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER 
    },
    email: {
        type: DataTypes.STRING, allowNull: false
    },
    password: {
        type: DataTypes.STRING, allowNull: false
    }
})

const Basket = sequelize.define('basket', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER, allowNull: false
    }
});

const GameBasket = sequelize.define('game_basket', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    game_id: {
        type: DataTypes.INTEGER, allowNull: false
    },
    basket_id: {
        type: DataTypes.INTEGER, allowNull: false
    }
});

const Game = sequelize.define('game', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    title: {
        type: DataTypes.STRING, allowNull: false
    },
    price: {
        type: DataTypes.STRING, allowNull: false
    },
    rating: {
        type: DataTypes.DOUBLE, allowNull: false
    },
    creator_id: {
        type: DataTypes.INTEGER, allowNull: false
    },
    computer_characteristics: {
        type: DataTypes.STRING, allowNull: false
    },
    game_release: {
        type: DataTypes.INTEGER, allowNull: false
    },
    image_id: {
        type: DataTypes.INTEGER, allowNull: false
    },
    genre: {
        type: DataTypes.STRING, allowNull: false
    }
});

const Image = sequelize.define('image', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    path_image: {
        type: DataTypes.INTEGER, allowNull: false
    }
});

const ComputerCharacteristics = sequelize.define('computerCharacteristics', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    characteristics_id: {
        type: DataTypes.STRING, allowNull: false
    }
})

const characteristics = sequelize.define('characteristics', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    minamal_characteristics: {
        type: DataTypes.STRING, allowNull: false
    },
    max_characteristics: {
        type: DataTypes.STRING, allowNull: false
    }
})

const UserRole = sequelize.define('user_role', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER, allowNull: false
    },
    name: {
        type: DataTypes.STRING, allowNull: false
    },
    permission_level: {
        type: DataTypes.STRING, allowNull: false
    }
})

const Genre = sequelize.define('genre', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    genre_name: {
        type: DataTypes.STRING, allowNull: false
    }
})

const Release = sequelize.define('release', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    ganre_name: {
        type: DataTypes.STRING, allowNull: false
    }
})

const Creator = sequelize.define('creator', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    name: {
        type: DataTypes.STRING, allowNull: false
    }
})

const Rating = sequelize.define('rating', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER, allowNull: false
    },
    game_id: {
        type: DataTypes.INTEGER, allowNull: false
    },
    rating: {
        type: DataTypes.DOUBLE, allowNull: false
    }
});

const GameInfo = sequelize.define('game_info', {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    },
    name: {
        type: DataTypes.STRING, allowNull: false
    },
    game_id: {
        type: DataTypes.INTEGER, allowNull: false
    },
    price: {
        type: DataTypes.STRING, allowNull: false
    },
    game_release: {
        type: DataTypes.INTEGER, allowNull: false
    }
})

User.hasOne(Basket, { foreignKey: 'id' });
Basket.belongsTo(User, { foreignKey: 'user_id' });

Basket.hasMany(GameBasket, { foreignKey: 'id' });
GameBasket.belongsTo(Basket, { foreignKey: 'game_id' });

Game.hasOne(GameBasket, { foreignKey: 'id' });
GameBasket.belongsTo(Game, { foreignKey: 'game_id' });

GameInfo.hasMany(Game, {foreignKey: 'game_id'});
Game.belongsTo(GameInfo, {foreignKey: 'id'});

ComputerCharacteristics.hasMany(Game, {foreignKey: 'id'});
Game.belongsTo(ComputerCharacteristics, {foreignKey: 'computer_characteristics'});

characteristics.hasMany(ComputerCharacteristics, {foreignKey: 'id'});
ComputerCharacteristics.belongsTo(characteristics, {foreignKey: 'computer_characteristics'});

Image.hasMany(Game, {foreignKey: 'id'});
Game.belongsTo(Image, {foreignKey: 'image_id'});

Genre.hasOne(Game, {foreignKey: 'id'});
Game.belongsTo(Genre, {foreignKey: 'genre'});

User.hasOne(UserRole, {foreignKey: 'id'});
UserRole.belongsTo(User, {foreignKey: 'user_id'});

Release.hasOne(Game, {foreignKey: 'id'});
Game.belongsTo(Release, {foreignKey: 'game_release'});

Creator.hasOne(Game, {foreignKey: 'id'});
Game.belongsTo(Creator, {foreignKey: 'creator_id'});

Game.hasOne(Rating, {foreignKey: 'rating'});
Rating.belongsTo(Game, {foreignKey: 'id'});

User.hasMany(Rating, {foreignKey: 'id'});
Rating.belongsTo(User, {foreignKey: 'user_id'});


module.exports = {
    User,
    Basket,
    GameBasket,
    Game,
    GameInfo,
    Image,
    ComputerCharacteristics,
    characteristics,
    Rating,
    Genre,
    Release,
    Creator,
    Rating,
    UserRole
};