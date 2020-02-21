'use strict';

module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName : 'John',
      lastName : 'Doe',
      age : 18,
      country: "Ukraine",
      createdAt : new Date(),
      updatedAt : new Date(),
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {
      firstName :'John'
    })
  }
};
