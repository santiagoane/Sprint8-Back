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
     await queryInterface.bulkInsert('Categories', [
      {name:"Surf",id:1},
      {name:"Kitesurf",id:2},
      {name:"Paddlesurf",id:3},
      {name:"Wakeboard",id:4},
      {name:"Snorkel",id:5},
      {name:"Windsurf",id:6}
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Categories', null, {})
  }
};
