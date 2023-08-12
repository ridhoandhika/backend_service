'use strict';

const {v4} = require('uuid')
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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
      {
        id: v4(),
        name: 'ridho andhika',
        email: 'ridhoandhika74@gmail.com',
        password: bcrypt.hashSync('seccret', 10),
        role_id: 'a6a120ae-6dcc-4596-acd8-72b58fb78aaa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: v4(),
        name: 'rdka',
        email: 'rdkashop@gmail.com',
        password: bcrypt.hashSync('seccret', 10),
        role_id: '9f313b25-1ae7-4c89-8b72-deee5fc51b4e',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
