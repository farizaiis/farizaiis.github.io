'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('admins', [
            {
                email: 'admin_phoenix@gmail.com',
                password:
                    '$2b$10$Jv65dA4Vg3D4iSnFliPoQu8bBE6gI1QkLoop42PnSmxxP78b1Mcy2',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('admins', null, {});
    },
};
