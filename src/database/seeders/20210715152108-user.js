'use strict';

const bcrypt = require ("bcryptjs")

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
     await queryInterface.bulkInsert('Users', [
      {id:1,name:"santiago",username:"santiane",email:"santi.ane@hotmail.com",avatar:"unavatar.jpg",roles_id:1,password:bcrypt.hashSync("123456",10)},
      {id:2,name:"pedro",username:"Padrito",email:"pedrito@hotmail.com",avatar:"unavatar.jpg",roles_id:1,password:bcrypt.hashSync("223456",10)},
      {id:3,name:"joaco",username:"joaquito",email:"joaquito@hotmail.com",avatar:"unavatar.jpg",roles_id:1,password:bcrypt.hashSync("323456",10)},
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {})
  }
};
