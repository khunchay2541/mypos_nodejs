'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename); //ไฟลปัจจุบัน
const env = process.env.NODE_ENV || 'development'; // run env ไหน
const config = require(__dirname + '/../config/config.json')[env]; //ดึงไฟล์ config  //env คือของแต่ละ อัน
const db = {}; //ตัวแปรสำหรับติดต่อ ฐานข้อมูล

let sequelize; //สร้างมาตัวแปรมา เพื่อเป็นตัวเช็คว่าเราจะใ้ช้ env ไหน
if (config.storage) {
  sequelize = new Sequelize(config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

init() //เรียกใช้

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); //ดึง model ทุกตัว ที่ไม่ใช ่ index.js
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
