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
     await queryInterface.bulkInsert('Images', [
      {file:"Filex.jpg",product_id:1,id:1},
      {file:"Filex.jpg",product_id:2,id:2},
      {file:"Filex.jpg",product_id:3,id:3},
      {file:"Filex.jpg",product_id:4,id:4},
      {file:"Filex.jpg",product_id:5,id:5},
      {file:"Filex.jpg",product_id:6,id:6},
      {file:"Filex.jpg",product_id:7,id:7},
      {file:"Filex.jpg",product_id:8,id:8},
      {file:"Filex.jpg",product_id:9,id:9},
      {file:"Filex.jpg",product_id:10,id:10},

    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Images', null, {})
  }
};
