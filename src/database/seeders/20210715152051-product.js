'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Products', [
      {name:"Tabla Kite Foil",description:"es una tabla",price:100,stock:2,categories_id:1,id:1,brands_id:1,colors_id:1,genders_id:1,sizes_id:1},
      {name:"Tabla Kite Twintip",description:"es una tabla nueva",price:100,stock:1,categories_id:1,id:2,brands_id:1,colors_id:1,genders_id:1,sizes_id:1},

    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Products', null, {})
  }
};
