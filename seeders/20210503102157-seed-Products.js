'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    data.map(item=>{
      item.created_at = new Date()
      item.updated_at = new Date()

    })

     await queryInterface.bulkInsert('Products',data , {});
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('Products', null, {});
  }
};

const data =[
  {
    "name": "testttttttt1",
    "image": "afqfqqq",
    "stock": 13,
    "price": 150
  },
  {
    "name": "testttttttt2",
    "image": "afqfqqq",
    "stock": 13,
    "price": 150
  },
  {
    "name": "testttttttt3",
    "image": "afqfqqq",
    "stock": 13,
    "price": 150
  },
  {
    "name": "testttttttt4",
    "image": "afqfqqq",
    "stock": 13,
    "price": 150
  },
]